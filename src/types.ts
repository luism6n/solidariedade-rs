export interface SheetData {
  sheet: Sheet;
}

export interface Sheet {
  version: string;
  reqId: string;
  status: string;
  sig: string;
  table: Table;
}

export interface Table {
  cols: Col[];
  rows: Row[];
  parsedNumHeaders: number;
}

export interface Col {
  id: string;
  label: string;
  type: string;
  pattern?: string;
}

export interface Row {
  c: C[] | undefined[];
}

export interface C {
  v: any;
  f?: string;
}
