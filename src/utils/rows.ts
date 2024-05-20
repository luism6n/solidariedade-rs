import { Col, Row } from "@/types";

export function getRowId(row: Row, cols: Col[]) {
  const idIndex = cols.findIndex((col) => col.name === "ID");
  return row.cells[idIndex].content;
}

export function getRowName(row: Row, cols: Col[]) {
  const nameIndex = cols.findIndex((col) => col.name === "Nome");

  const content = row.cells[nameIndex].content;

  if (typeof content !== "string") {
    return;
  }

  return content;
}
