export enum Tag {
  ESCONDIDO = "escondido",
  ATUALIZAVEL = "atualizavel",
  LISTA = "lista",
  GOOGLE_MAPS = "google-maps",
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

// TODO: updatedAt should be an ISO date string
export type Cell = {
  content: string[] | string | number | null;
  updatedAt?: string;
  // true when content should become a query in a Google maps link
  googleMaps?: boolean;
};
