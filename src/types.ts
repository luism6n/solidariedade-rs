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
