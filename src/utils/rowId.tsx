import { Col, Row } from "@/types";

export function getRowId(row: Row, cols: Col[]) {
  const idIndex = cols.findIndex((col) => col.name === "ID");
  return row.cells[idIndex].content;
}
