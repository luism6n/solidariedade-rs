export enum Tag {
  ESCONDIDO = "escondido",
  ATUALIZAVEL = "atualizavel",
  LISTA = "lista",
  GOOGLE_MAPS = "google-maps",
  FILTRO_ESCOLHA = "filtro-escolha",
  FILTRO_QUALQUER_ESCOLHIDO = "filtro-qualquer-escolhido",
  FILTRO_TODOS_ESCOLHIDOS = "filtro-todos-escolhidos",
  LINK = "link",
  GROUP = "grupo",
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
  filterWithOr?: boolean;
  filterWithAnd?: boolean;
  choices?: string[];
  link?: boolean;
  groupName?: string;
}

export interface Row {
  cells: Cell[];
}

// TODO: updatedAt should be an ISO date string
export type Cell = {
  id: number;
  content: string[] | string | number | null;
  updatedAt?: string;
  // true when content should become a query in a Google maps link
  googleMaps?: boolean;
  lat?: number;
  lng?: number;
};
