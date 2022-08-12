import type { Image } from "./Tracks";

export interface Results {
  "#text": string;
  role: string;
  searchTerms: string;
  startPage: string;
}

export interface SearchArtist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Image[];
}

export interface SearchArtists {
  results: {
    "opensearch:totalResults": string;
    "opensearch:startIndex": string;
    "opensearch:itemsPerPage": string;
    artistmatches: {
      artist: SearchArtist[];
    };
  };
}
