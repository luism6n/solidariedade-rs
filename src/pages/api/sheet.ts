// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cell, Sheet } from "@/types";
import { parse } from "csv-parse/sync";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type Data = Sheet;

// gid can be obtained checking the gid query param in the address bar when
// accessing the sheet from a browser
const sheetGid = process.env.NODE_ENV === "development" ? "1025587008" : "0";

const knownTags = ["escondido", "atualizavel", "lista"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("new request");

  const sheetResponse = await fetch(
    `https://docs.google.com/spreadsheets/d/1sKzh0Do_2fvIqhjwm-mNs5XaH6QOrvC-xTbYlnFg5bE/export?format=csv&gid=${sheetGid}`,
    { redirect: "follow" }
  );

  if (sheetResponse.status !== 200 || !sheetResponse.body) {
    console.error(`failed to fetch sheet ${sheetResponse.body}`);
    res.status(502);
    return;
  }

  let csv: unknown;
  const body = await sheetResponse.text();
  try {
    csv = parse(body);
  } catch {
    console.error(`failed to parse sheet response: ${body}`);
    res.status(500);
    return;
  }

  // use zod to check it's at least a 3 rows and 1 column
  const googleSheetSchema = z.array(z.array(z.string()).min(1)).min(3);

  let googleSheetData;
  try {
    googleSheetData = googleSheetSchema.parse(csv);
  } catch (e) {
    console.error(`sheet response not in expected format: ${e}`);
    res.status(500);
    return;
  }

  const data: Sheet = {
    cols: [],
    rows: [],
  };

  for (let c = 0; c < googleSheetData[1].length; c++) {
    const name = googleSheetData[1][c] || `col${c}`;

    data.cols.push({ name });
  }

  // Map column name -> column index where the updated date is
  const timeStampIndices = new Map<string, number>();

  // second row is tags, separated by ;
  const tagRow = googleSheetData[2];
  console.log("tagRow", tagRow);
  console.log("tagRowAlt", googleSheetData[1]);
  const tagsInColumn: string[][] = [];
  for (let c = 0; c < data.cols.length; c++) {
    const col = data.cols[c];
    tagsInColumn[c] = [];

    const tagsString = tagRow[c];
    if (typeof tagsString !== "string") {
      console.warn(
        `unexpected data type in tag column: ${typeof tagsString} in column ${
          col.name
        }`
      );
      continue;
    }

    const tagList = tagsString.split(";").map((tag) => tag.trim());

    for (const tag of tagList) {
      if (knownTags.includes(tag)) {
        if (tag === "escondido") {
          col.hidden = true;
        } else if (tag === "atualizavel") {
          col.hidden = true;
          timeStampIndices.set(col.name, c);
        }

        tagsInColumn[c].push(tag);
      } else {
        console.warn(`unknown tag ${tag} in column ${col.name}`);
      }
    }
  }

  for (let r = 3; r < googleSheetData.length; r++) {
    const row = googleSheetData[r];
    const cells: Cell[] = [];

    for (let c = 0; c < row.length; c++) {
      const content = row[c];

      const cell: Cell = { content: null, updatedAt: undefined };

      if (typeof content === "undefined") {
        console.warn(
          `unexpected undefined type ${typeof content} in cell ${r},${c} with value ${content}`
        );
        cells.push(cell);
        continue;
      }

      if (content === "") {
        cell.content = null;
      } else if (tagsInColumn[c].includes("lista")) {
        cell.content = content.split(";");
      } else if (typeof content === "string" && stringHasContent(content)) {
        cell.content = content;
      } else if (typeof content === "number") {
        cell.content = content;
      } else {
        console.warn(
          `unexpected cell value type ${typeof content} in cell ${r},${c} with value ${content}`
        );
      }

      if (timeStampIndices.has(data.cols[c].name)) {
        const timestampIndex = timeStampIndices.get(data.cols[c].name);

        if (!timestampIndex) {
          throw new Error("impossible to reach this, but typescript complains");
        }

        const updatedAt = formatDate(row[timestampIndex]);
        if (updatedAt) {
          cell.updatedAt = updatedAt.toISOString();
        } else {
          console.warn(
            `unexpected updatedAt type ${typeof updatedAt} in cell ${r},${c} with value ${updatedAt}`
          );
        }
      }

      cells.push(cell);
    }

    // remove empty rows (rows with all null content or just the ID column)
    if (
      cells.every(
        (cell, i) => cell.content === null || data.cols[i].name === "ID"
      )
    ) {
      continue;
    }

    data.rows.push({ cells });
  }

  res.send(data);
}

function formatDate(date: unknown): Date | null {
  if (typeof date !== "string") {
    return null;
  }

  // Extract only what's inside the parenthesis
  const extractedContents = date.match(/\(([^)]+)\)/)?.[1];

  if (!extractedContents) {
    return null;
  }

  // Split the contents by commas to get individual values
  const [year, month, day, hour, minute, second] = extractedContents.split(",");

  // Create a new Date object using the extracted values
  const formattedDate = new Date(
    parseInt(year),
    parseInt(month) - 1, // Month is zero-based in JavaScript Date object
    parseInt(day),
    parseInt(hour),
    parseInt(minute),
    parseInt(second)
  );

  return formattedDate;
}

function stringHasContent(str: string): boolean {
  const chars = new Set(str.trim());

  // since we use formular, they can leave leftovers, so if the string has only
  // spaces and commas, it's considered empty
  chars.delete(" ");
  chars.delete(",");

  return chars.size > 0;
}
