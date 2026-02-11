export interface oldGamesAPIResponseObject {
  data: Game[];
  meta: Meta;
}

export interface Game {
  description: string;
  genre: string[];
  id: number;
  image: Image;
  name: string;
  released: string;
  slug: string;
}

export interface Image {
  alt: string;
  url: string;
}

export interface Meta {
  currentPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: number;
  pageCount: number;
  previousPage: number;
  totalCount: number;
}

export interface FetchGames extends oldGamesAPIResponseObject {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
}
