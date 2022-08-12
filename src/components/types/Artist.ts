import type { Attr, Image } from "./Tracks";

export interface Artist {
  name: string;
  playcount: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Image[];
}

export interface TopArtists {
  artists: {
    "@attr": Attr;
    artist: Artist[];
  }
}
