import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import Item from "../components/Item";
import { SearchArtist } from "./types/SearchArtist";
import { SearchTrack } from "./types/SearchTrack";
import Button from "./Button";
import ShowLoading from "../components/ShowLoading"

interface SearchType {
  isArtist?: boolean;
  isTrack?: boolean;
}

const DUMMY_SEARCH_PARAMS = "21931923";

const Search = ({ isArtist, isTrack }: SearchType) => {
  const [keyword, setKeyword] = useState<string>("");

  const category: string = isArtist ? "artist" : "track";
  const categoryTranslate: string = isArtist ? "artis" : "lagu";

  const {
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
    return <ShowLoading />;
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
      <div className="flex flex-row items-center gap-4">
        <Link className="w-full" to="/">
          <Button isHome bgColor="bg-purple-500" />
        </Link>
        {isArtist && (
          <Link className="w-full" to="/search_songs">
            <Button isSearchSongs bgColor="bg-pink-500" />
          </Link>
        )}
        {isTrack && (
          <Link className="w-full" to="/search_artists">
            <Button isSearchArtists bgColor="bg-blue-500" />
          </Link>
        )}
      </div>
      <div className="font-bold text-xl md:text-3xl mt-10 mb-4">
        Cari {categoryTranslate}
      </div>
      <input
        onChange={(e) => handleInputChanges(e)}
        type="text"
        className="py-2 pl-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        placeholder={`Masukkan kata kunci ${categoryTranslate}`}
      />
      {listOfItems.length > 0 && (
        <div className="mt-4">
          Menampilkan 10 hasil pencarian teratas untuk "{keyword}"
        </div>
      )}
      {!listOfItems.length && (
        <div className="mt-4 text-sm">Menunggu masukkan input...</div>
      )}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {isArtist &&
          listOfItems &&
          listOfItems
            .slice(0, 10)
            .map((artist: SearchArtist, index: number) => (
              <Item key={index} id={index} artistName={artist.name} url={artist.url} />
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
                url={track.url}
              />
            ))}
      </div>
    </div>
  );
};

export default Search;
