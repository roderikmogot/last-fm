import type { Image } from "./Tracks";

export interface SearchTrack {
  name: string;
  artist: string;
  mbid: string;
  url: string;
  listeners: string;
  streamable: string;
  image: Image[];
}

export interface SearchTracks {
  results: {
    "opensearch:totalResults": string;
    "opensearch:startIndex": string;
    "opensearch:itemsPerPage": string;
    trackmatches: {
      track: SearchTrack[];
    };
  };
}
