import { useEffect, useState } from "react";
import type { TopTracks } from "./types/Tracks";
import type { TopArtists } from "./types/Artist";
import type { SearchArtists } from "./types/SearchArtist";
import type { SearchTracks } from "./types/SearchTrack";

export const useFetch = (method: string, type: "top10" | "search", searchParam: string) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [data, setData] = useState<TopTracks & TopArtists & SearchArtists & SearchTracks>();
  const [error, setError] = useState<string>("");

  const handler = async (searchParam: string) => {
    let url: string = ""

    if (type === "search") {
      url = `http://ws.audioscrobbler.com/2.0/?method=${method}${searchParam}&api_key=${API_KEY}&format=json`
    } else {
      url = `http://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${API_KEY}&format=json`
    }

    const response = await fetch(
      url
    );

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
  }, [method]);

  return { data, error, handler };
};
