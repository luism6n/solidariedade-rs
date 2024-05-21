import { Col, Row } from "@/types";

export function getRowId(row: Row, cols: Col[]) {
  const idIndex = cols.findIndex((col) => col.name === "ID");
  return row.cells[idIndex].content;
}

export function getRowTitle(row: Row, cols: Col[]) {
  const nameIndex = cols.findIndex((col) => col.title);

  if (nameIndex === -1) {
    return;
  }

  const content = row.cells[nameIndex].content;

  if (typeof content !== "string") {
    return;
  }

  return content;
}
