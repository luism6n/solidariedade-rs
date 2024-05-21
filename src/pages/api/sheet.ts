// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getGeocoding } from "@/server/getGeocoding";
import { Cell, Sheet, Tag } from "@/types";
import { parse } from "csv-parse/sync";
import moment from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

type Data = Sheet | null;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let googleSheetData;
  // get rowId from request param
  const rowId = req.query.rowId as string | undefined;

  try {
    googleSheetData = await getGoogleSheetData();
  } catch (e) {
    console.error(e);
    res.status(500);
    return;
  }

  const data = await parseCsvData(googleSheetData);

  if (rowId) {
    const idIndex = data.cols.findIndex((col) => col.name === "ID");

    const row = data.rows.find((r) => r.cells[idIndex].content === rowId);

    if (!row) {
      res.status(404).send(null);
      return;
    }

    data.rows = [row];
  }

  res.send(data);
}

async function parseCsvData(googleSheetData: string[][]) {
  const data: Sheet = {
    cols: [],
    rows: [],
  };

  for (let c = 0; c < googleSheetData[1].length; c++) {
    const name = googleSheetData[1][c] || `col${c}`;

    data.cols.push({ index: c, name });
  }

  // Map column name -> column index where the updated date is
  const timeStampIndices = new Map<string, number>();

  // second row is tags, separated by ;
  const tagRow = googleSheetData[2];
  const tagsInColumn: string[][] = [];
  for (let c = 0; c < data.cols.length; c++) {
    const col = data.cols[c];
    tagsInColumn[c] = [];

    const tagsString = tagRow[c];
    if (typeof tagsString !== "string") {
      console.warn(
        `unexpected data type in tag column: ${typeof tagsString} in column ${
          col.name
        }`,
      );
      continue;
    }

    const tagList = tagsString.split(";").map((tag) => tag.trim());

    for (const tag of tagList) {
      if (tag === "") continue;

      if (!Object.values(Tag).includes(tag as Tag)) {
        console.warn(`unknown tag "${tag}" in column ${col.name}`);
      }

      if (tag === Tag.ESCONDIDO) {
        col.hidden = true;
      }

      if (tag === Tag.ATUALIZAVEL) {
        col.hidden = true;
        timeStampIndices.set(col.name, c);
      }

      if (tag === Tag.LINK) {
        col.link = true;
      }

      if (tag === Tag.FILTRO_QUALQUER_ESCOLHIDO) {
        col.choices = [];
        col.filterWithOr = true;
      } else if (tag === Tag.FILTRO_TODOS_ESCOLHIDOS) {
        col.choices = [];
        col.filterWithAnd = true;
      } else if (tag === Tag.FILTRO_ESCOLHA) {
        col.choices = [];
      }

      if (tag.startsWith(`${Tag.GROUP}:`)) {
        col.groupName = tag.split(":")[1].trim();
      }

      if (tag.startsWith(`${Tag.VERDE}:`)) {
        col.goodValue = tag.split(":")[1].trim();
      }

      if (tag.startsWith(`${Tag.VERMELHO}:`)) {
        col.warnValue = tag.split(":")[1].trim();
      }

      if (tag === Tag.TITLE) {
        col.title = true;
      }

      if (tag === Tag.VALUES_ONLY) {
        col.valuesOnly = true;
      }

      if (tag === Tag.MAIN_INFO) {
        col.mainInfo = true;
      }

      tagsInColumn[c].push(tag);
    }
  }

  let cellId = 0;
  let numRowsSkipped = 0;
  for (let r = 3; r < googleSheetData.length; r++) {
    const row = googleSheetData[r];
    const cells: Cell[] = [];
    let verified = false;

    // remove empty rows (rows with all null content or just the ID column)
    if (
      row.every(
        (cell, i) => !stringHasContent(cell) || data.cols[i].name === "ID",
      )
    ) {
      numRowsSkipped++;
      continue;
    }

    for (let c = 0; c < row.length; c++) {
      const content = row[c];

      const cell: Cell = { id: cellId++, content: null, updatedAt: undefined };

      if (typeof content === "undefined") {
        console.warn(
          `unexpected undefined type ${typeof content} in cell ${r},${c} with value ${content}`,
        );
        cells.push(cell);
        continue;
      }

      if (content === "") {
        cells.push(cell);
        continue;
      }

      if (tagsInColumn[c].includes(Tag.LISTA)) {
        cell.content = content
          .split(";")
          .filter(stringHasContent)
          .map((s) => s.trim());

        for (const item of cell.content) {
          if (item.length > 40) {
            console.warn(
              `unexpected long item in list in cell ${r},${c} with value "${item}", this item will appear ellipsized`,
            );
          }
        }
      } else if (typeof content === "string" && stringHasContent(content)) {
        cell.content = content.trim();
      }

      if (typeof content === "number") {
        cell.content = content;
      }

      if (tagsInColumn[c].includes(Tag.GOOGLE_MAPS)) {
        cell.googleMaps = true;
        const { lat, lng } = await getGeocoding(content);
        if (!lat || !lng) {
          console.error("failed to get coordinates for", content);
        }
        cell.lat = lat;
        cell.lng = lng;
      }

      if (
        tagsInColumn[c].includes(Tag.FILTRO_ESCOLHA) ||
        tagsInColumn[c].includes(Tag.FILTRO_QUALQUER_ESCOLHIDO) ||
        tagsInColumn[c].includes(Tag.FILTRO_TODOS_ESCOLHIDOS)
      ) {
        const choices = data.cols[c].choices;

        if (!choices) {
          console.error(
            `unexpected missing choices in column ${data.cols[c].name}`,
          );
        } else {
          let newChoices: string[];

          if (Array.isArray(cell.content)) {
            newChoices = cell.content;
          } else if (typeof cell.content === "string") {
            newChoices = [cell.content];
          } else {
            console.warn(
              `non-string content in cell ${r},${c} with value ${cell.content} used in filter, this will be ignored`,
            );
            newChoices = [];
          }

          for (const choice of newChoices) {
            if (choices.includes(choice)) {
              continue;
            }

            choices.push(choice);
          }
        }
      }

      if (timeStampIndices.has(data.cols[c].name)) {
        const timestampIndex = timeStampIndices.get(data.cols[c].name);

        if (!timestampIndex) {
          throw new Error("impossible to reach this, but typescript complains");
        }

        try {
          const updatedAt = parseDate(row[timestampIndex]);
          cell.updatedAt = updatedAt.toISOString();
        } catch (e) {
          if (row[timestampIndex].trim() !== "") {
            console.warn(
              `failed to parse date in cell ${r},${c} with value ${row[timestampIndex]}: ${e}`,
            );
          }
        }
      }

      if (tagsInColumn[c].includes(Tag.LINK)) {
        if (!cell.content || typeof cell.content !== "string") {
          console.warn(
            `unexpected content type ${typeof cell.content} in cell ${r},${c} with value ${
              cell.content
            }`,
          );
          continue;
        }

        if (!cell.content.startsWith("http")) {
          cell.content = `http://${cell.content}`;
        }
      }

      if (tagsInColumn[c].includes(Tag.VERIFIED) && isVerified(content)) {
        verified = true;
      }

      cells.push(cell);
    }

    data.rows.push({ cells, verified });
  }

  console.info("skipped", numRowsSkipped, "empty rows");

  return data;
}

async function getGoogleSheetData() {
  const sheetResponse = await fetch(
    `https://docs.google.com/spreadsheets/d/${process.env.NEXT_PUBLIC_SHEET_ID}/export?format=csv&gid=${process.env.NEXT_PUBLIC_SHEET_GID}`,
    { redirect: "follow" },
  );

  if (sheetResponse.status !== 200 || !sheetResponse.body) {
    throw new Error(
      `failed to fetch sheet ${sheetResponse.body}, ${sheetResponse.status}`,
    );
  }

  let csv: unknown;
  const body = await sheetResponse.text();
  try {
    csv = parse(body);
  } catch {
    throw new Error(`failed to parse sheet response: ${body}`);
  }

  // use zod to check it's at least a 3 rows and 1 column
  const googleSheetSchema = z.array(z.array(z.string()).min(1)).min(3);

  let googleSheetData;
  try {
    googleSheetData = googleSheetSchema.parse(csv);
  } catch (e) {
    throw new Error(`sheet response not in expected format: ${e}`);
  }

  return googleSheetData;
}

function parseDate(date: unknown): Date {
  if (typeof date !== "string") {
    throw new Error(`unexpected date type ${typeof date}`);
  }

  return moment(date, "DD/MM HH:mm").toDate();
}

function stringHasContent(str: string): boolean {
  const chars = new Set(str.trim());

  // since we use formular, they can leave leftovers, so if the string has only
  // spaces and commas, it's considered empty
  chars.delete(" ");
  chars.delete(",");

  return chars.size > 0;
}

function isVerified(content: string): boolean {
  return content.toLowerCase().trim() === "sim";
}
