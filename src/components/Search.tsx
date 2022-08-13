import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import Item from "../components/Item";
import { SearchArtist } from "./types/SearchArtist";
import { SearchTrack } from "./types/SearchTrack";

interface SearchType {
  isArtist?: boolean;
  isTrack?: boolean;
}

const DUMMY_SEARCH_PARAMS = "21931923";

const Search = ({ isArtist, isTrack }: SearchType) => {
  const [keyword, setKeyword] = useState<string>("");

  let category: string = isArtist ? "artist" : "track";

  let {
    data: searchItems,
    error,
    handler: searchHandler,
  } = useFetch(
    `${category}.search`,
    "search",
    `&${category}=${DUMMY_SEARCH_PARAMS}`
  );

  if (error) {
    alert("Terdapat error saat mengambil data!");
  }

  if (!searchItems) {
    return <div>Loading...</div>;
  }

  const listSearchForArtists = searchItems.results.artistmatches?.artist;
  const listSearchForTracks = searchItems.results.trackmatches?.track;
  const listOfItems: any = isArtist
    ? listSearchForArtists
    : listSearchForTracks;

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const typedText: string = e.target.value;
    if (!typedText.length) {
      searchHandler(`&${category}=${DUMMY_SEARCH_PARAMS}`);
      setKeyword("");
    } else {
      searchHandler(`&${category}=` + typedText);
      setKeyword(typedText);
    }
  };

  return (
    <div className="p-4">
      <Link to="/">
        <button className="px-4 py-2 bg-purple-500 text-white">Home</button>
      </Link>
      {isArtist && (
        <Link to="/search_songs">
          <button className="ml-4 px-4 py-2 bg-pink-500 text-white">
            Cari lagu
          </button>
        </Link>
      )}
      {isTrack && (
        <Link to="/search_artists">
          <button className="ml-4 px-4 py-2 bg-blue-500 text-white">
            Cari artist
          </button>
        </Link>
      )}
      <div className="text-center font-bold text-2xl my-4">Cari {category}</div>
      <input
        onChange={(e) => handleInputChanges(e)}
        type="text"
        className="py-2 pl-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        placeholder={`Masukkan kata kunci ${category}`}
      />
      {listOfItems.length > 0 && (
        <div className="font-bold mt-4 text-2xl">
          Menampilkan 10 hasil pencarian teratas untuk "{keyword}"
        </div>
      )}
      {!listOfItems.length && (
        <div className="mt-4 text-lg">Menunggu masukkan input...</div>
      )}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {isArtist &&
          listOfItems &&
          listOfItems
            .slice(0, 10)
            .map((artist: SearchArtist, index: number) => (
              <Item key={index} id={index} artistName={artist.name} />
            ))}
        {isTrack &&
          listOfItems &&
          listOfItems
            .slice(0, 10)
            .map((track: SearchTrack, index: number) => (
              <Item
                key={index}
                id={index}
                artistName={track.artist}
                trackName={track.name}
              />
            ))}
      </div>
    </div>
  );
};

export default Search;
