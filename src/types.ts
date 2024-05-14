export enum Tag {
  ESCONDIDO = "escondido",
  ATUALIZAVEL = "atualizavel",
  LISTA = "lista",
  GOOGLE_MAPS = "google-maps",
  FILTRO_ESCOLHA = "filtro-escolha",
}

export interface Sheet {
  cols: Col[];
  rows: Row[];
}

export interface Col {
  // index is useful if we filter columns but want the original index
  index: number;
  name: string;
  hidden?: boolean;
  multiselect?: boolean;
  choices?: string[];
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
