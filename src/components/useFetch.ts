import { useEffect, useState } from "react";
import type { TopTracks } from "./types/Tracks";
import type { TopArtists } from "./types/Artist";
import type { SearchArtists } from "./types/SearchArtist";
import type { SearchTracks } from "./types/SearchTrack";

export const useFetch = (method: string, type: "top10" | "search", searchParam: string) => {
  const API_KEY = "3e2a786b100302b62e6e7f86f0886028";
  const [data, setData] = useState<TopTracks & TopArtists & SearchArtists & SearchTracks>();
  const [error, setError] = useState<string>("");

  const handler = async (searchParam: string) => {
    let url: string = ""

    if (type === "search") {
      url = `https://ws.audioscrobbler.com/2.0/?method=${method}${searchParam}&api_key=${API_KEY}&format=json`
    } else {
      url = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${API_KEY}&format=json`
    }

    const response = await fetch(url);

    if (!response.ok) {
      setError("Terjadi error saat mengambil data!");
      return;
    }

    const data = await response.json();
    setData(data);
    setError("");
  };

  useEffect(() => {
    handler(searchParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method]);

  return { data, error, handler };
};
