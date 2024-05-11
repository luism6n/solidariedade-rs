export interface Sheet {
  cols: Col[];
  rows: Row[];
}

export interface Col {
  tags: string[];
  name: string;
}

export interface Row {
  cells: (Cell | null)[];
}

export type Cell = string | number;

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
  v: any;
  f?: string;
}
