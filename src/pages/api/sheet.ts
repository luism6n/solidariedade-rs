// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Cell, GoogleSheet, Sheet } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Sheet;

const knownTags = ["ignore", "updated", "list"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("new request");

  const sheetResponse = await fetch(
    "https://docs.google.com/spreadsheets/d/1sKzh0Do_2fvIqhjwm-mNs5XaH6QOrvC-xTbYlnFg5bE/gviz/tq?tqx=out:json&range=PLANILHA!A2:ZZ"
  );

  if (sheetResponse.status !== 200) {
    console.error(`failed to fetch sheet ${sheetResponse.body}`);
    res.status(502);
    return;
  }

  let googleSheetData: GoogleSheet;
  let jsonString: string;
  try {
    const regexGroups = /google.visualization.Query.setResponse\((.*)\);/.exec(
      await sheetResponse.text()
    );

    if (!regexGroups?.length || regexGroups.length < 2) {
      console.error(`failed to fetch sheet ${regexGroups}`);
      res.status(500);
      return;
    } else {
      jsonString = regexGroups[1];
    }

    googleSheetData = JSON.parse(jsonString) as GoogleSheet;
  } catch (error) {
    console.error("error extracting JSON from response:", error);
    res.status(500);
    return;
  }

  const data: Sheet = {
    cols: [],
    rows: [],
  };

  // Map column name -> column index where the updated date is
  const timeStampIndices = new Map<string, number>();

  for (let c = 0; c < googleSheetData.table.cols.length; c++) {
    const col = googleSheetData.table.cols[c];

    const name = col.label.replace(/\[.*?\]/g, "").trim() || "<unnamed column>";

    let tags: string[] = [];
    // find tags, remove brackets []
    let match = col.label.match(/\[.*?\]/g);

    if (match) {
      tags = match.map((tag) => tag.replace(/[\[\]]/g, ""));
    }

    // replace unknown tags with "ignore"
    for (let t = 0; t < tags.length; t++) {
      if (!knownTags.includes(tags[t])) {
        tags[t] = "ignore";
      }

      if (tags[t] === "updated") {
        timeStampIndices.set(name, c);
      }
    }

    data.cols.push({ tags, name });
  }

  console.log("timeStampIndices", timeStampIndices);

  for (let r = 0; r < googleSheetData.table.rows.length; r++) {
    const row = googleSheetData.table.rows[r];
    const cells: Cell[] = [];
    console.log("row", row);

    for (let c = 0; c < row.c.length; c++) {
      const googleSheetCell = row.c[c];
      const cell: Cell = { content: null, updatedAt: undefined };

      googleSheetCell?.v;

      if (googleSheetCell === null) {
        // empty cell
        cells.push(cell);
        continue;
      } else if (typeof googleSheetCell === "undefined") {
        console.warn(
          `unexpected undefined type ${typeof googleSheetCell} in cell ${r},${c} with value ${googleSheetCell}`
        );
        cells.push(cell);
        continue;
      }

      if (
        typeof googleSheetCell.v === "string" ||
        typeof googleSheetCell.v === "number"
      ) {
        cell.content = googleSheetCell.v;
      } else if (typeof googleSheetCell.v === "undefined") {
        cell.content = null;
      } else {
        console.warn(
          `unexpected cell value type ${typeof googleSheetCell.v} in cell ${r},${c} with value ${
            googleSheetCell.v
          }`
        );
      }

      if (timeStampIndices.has(data.cols[c].name)) {
        const timestampIndex = timeStampIndices.get(data.cols[c].name);

        if (!timestampIndex) {
          throw new Error("impossible to reach this, but typescript complains");
        }

        const updatedAt = formatDate(row.c[timestampIndex]?.v);
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
      console.warn(`ignoring empty row ${r}`);
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
