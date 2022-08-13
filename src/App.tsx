import { useFetch } from "./components/useFetch";
import type { Track } from "./components/types/Tracks";
import type { Artist } from "./components/types/Artist";
import { Link } from "react-router-dom";
import Item from "./components/Item";
import { TbBrandLastfm } from "react-icons/tb";
import Button from "./components/Button";

function App() {
  const { data: topTracks, error: errorTopTracks } = useFetch(
    "chart.gettoptracks",
    "top10",
    ""
  );
  const { data: topArtists, error: errorTopArtists } = useFetch(
    "chart.gettopartists",
    "top10",
    ""
  );

  if (errorTopTracks || errorTopArtists) {
    alert("Terdapat error saat mengambil data");
  }

  if (!topTracks || !topArtists) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-row justify-between items-center gap-4">
        <Link className="w-full" to="/search_artists">
          <Button isSearchArtists bgColor="bg-blue-500" />
        </Link>
        <Link className="w-full" to="/search_songs">
          <Button isSearchSongs bgColor="bg-red-500" />
        </Link>
      </div>

      {/* Top 10 Artists */}
      <div className="mt-10 font-black text-2xl md:text-4xl">Top 10 Tracks</div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {topTracks &&
          topTracks.tracks.track
            .slice(0, 10)
            .map(({ artist, name: trackTitle }: Track, index: number) => (
              <Item
                key={index}
                id={index}
                artistName={artist.name}
                trackName={trackTitle}
              />
            ))}
      </div>

      {/* Top 10 Artists */}
      <div className="mt-10 font-black text-2xl md:text-4xl">Top 10 Artists</div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {topArtists &&
          topArtists.artists.artist
            .slice(0, 10)
            .map(({ name: artistName }: Artist, index: number) => (
              <Item key={index} id={index} artistName={artistName} />
            ))}
      </div>

      <div className="w-fit mx-auto mt-10 mb-4">
        <a href="https://www.last.fm/home" target="_blank" rel="noreferrer">
          <div className="cursor-pointer flex items-center bg-black text-white rounded-md px-4 py-2">
            API by
            <span className="mx-1 text-2xl">
              <TbBrandLastfm />
            </span>
            last.fm
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;
