export enum Tag {
  IGNORE = "ignore",
  UPDATED = "updated",
  LIST = "list",
  ADDRESS = "address",
}

export interface Sheet {
  cols: Col[];
  rows: Row[];
}

export interface Col {
  // group?: string;
  name: string;
  hidden?: boolean;
}

export interface Row {
  cells: Cell[];
}

// TODO: content should also accept string[] and list should be removed
// TODO: updatedAt should be an ISO date string
export type Cell = {
  content: string[] | string | number | null;
  updatedAt?: string;
  // true when content should become a query in a Google maps link
  googleMaps?: boolean;
};

// Google Sheet API response types
export interface GoogleSheet {
  version: string;
  reqId: string;
  status: string;
  sig: string;
  table: GoogleSheetTable;
}

export interface GoogleSheetTable {
  cols: GoogleSheetCol[];
  rows: GoogleSheetRow[];
  parsedNumHeaders: number;
}

export interface GoogleSheetCol {
  id: string;
  label: string;
  type: string;
  pattern?: string;
}

export interface GoogleSheetRow {
  c: GoogleSheetRowCell[] | undefined[];
}

export interface GoogleSheetRowCell {
  v: unknown;
  f?: string;
}
