export interface Sheet {
  cols: Col[];
  rows: Row[];
}

// TODO: tags should become properties. E.g., [ignore] X -> { hidden: true }
export interface Col {
  tags: string[];
  name: string;
}

export interface Row {
  cells: Cell[];
}

// TODO: content should also accept string[] and list should be removed
// TODO: updatedAt should be a Date object
export type Cell = {
  content: string | number | null;
  updatedAt: string | undefined;
  list: string[] | undefined;
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
  v: any;
  f?: string;
}
