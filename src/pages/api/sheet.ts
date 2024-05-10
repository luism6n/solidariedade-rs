// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GoogleSheet, Sheet } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = Sheet;

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
  } catch (error) {
    console.error("error extracting JSON from response:", error);
    res.status(500);
    return;
  }

  const googleSheetData = JSON.parse(jsonString) as GoogleSheet;
  console.log(googleSheetData.table);
  const data: Sheet = {
    cols: googleSheetData.table.cols.map((col) => ({
      // extract tags from col.label ([x] [y] [z] name => [x, y, z] name)
      tags:
        col.label.match(/\[.*?\]/g)?.map((tag) => tag.replace(/[\[\]]/g, "")) ||
        [],
      name: col.label,
    })),
    rows: googleSheetData.table.rows.map((row) => ({
      cells: row.c.map((cell) => cell?.v),
    })),
  };

  res.send(data);
}
