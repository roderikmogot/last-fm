export interface Artist {
  name: string;
  mbid: string;
  url: string;
}

export interface Image {
  size: "small" | "medium" | "large" | "extralarge";
  "#text": string;
}

export interface Track {
  artist: Artist;
  duration: string;
  playcount: string;
  image: Image[];
  listeners: string;
  mbid: string;
  name: string;
  streamable: {
    fulltrack: string;
    "#text": string;
  };
  url: string;
}

export interface Attr {
  page: string;
  perPage: string;
  total: string;
  totalPages: string;
}

export interface TopTracks {
  tracks: {
    "@attr": Attr;
    track: Track[];
  };
}
