// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoogleSheet, Sheet } from "@/types";
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

  for (const col of googleSheetData.table.cols) {
    // find tags, remove brackets []
    let tags = col.label
      .match(/\[.*?\]/g)
      ?.map((tag) => tag.replace(/[\[\]]/g, ""));

    if (!tags) {
      tags = [];
    }

    // replace unknown tags with "ignore"
    for (let i = 0; i < tags.length; i++) {
      if (!knownTags.includes(tags[i])) {
        tags[i] = "ignore";
      }
    }

    const name = col.label.replace(/\[.*?\]/g, "").trim() || "<unnamed column>";
    data.cols.push({ tags, name });
  }

  for (const row of googleSheetData.table.rows) {
    const cells: (string | null)[] = [];

    for (const cell of row.c) {
      if (!cell?.v) {
        cells.push(null);
      } else {
        cells.push(cell.v);
      }
    }

    data.rows.push({ cells });
  }

  res.send(data);
}
