import { useFetch } from "./components/useFetch";
import type { Track } from "./components/types/Tracks";
import type { Artist } from "./components/types/Artist";
import { Link } from "react-router-dom";
import Item from "./components/Item";

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
      <Link to="/search_artists">
        <button className="px-4 py-2 bg-blue-500 text-white">
          Cari artist
        </button>
      </Link>
      <Link to="/search_songs">
        <button className="ml-4 px-4 py-2 bg-red-500 text-white">
          Cari lagu
        </button>
      </Link>

      {/* Top 10 Artists */}
      <div className="mt-4 font-black text-4xl">Top 10 Tracks</div>
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
      <div className="font-black text-4xl mt-10">Top 10 Artists</div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {topArtists &&
          topArtists.artists.artist
            .slice(0, 10)
            .map(({ name: artistName }: Artist, index: number) => (
              <Item key={index} id={index} artistName={artistName} />
            ))}
      </div>
    </div>
  );
}

export default App;
