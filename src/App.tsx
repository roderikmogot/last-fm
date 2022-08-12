import { useFetch } from "./components/getData";
import type { Track } from "./components/types/Tracks";
import type { Artist } from "./components/types/Artist";
import { Link } from "react-router-dom";

function App() {
  const { data: topTracks, error: errorTopTracks } =
    useFetch("chart.gettoptracks", "top10", "");
  const { data: topArtists, error: errorTopArtists } = useFetch(
    "chart.gettopartists", "top10", ""
  );

  if (!topTracks || !topArtists) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <Link to="/search_artists">
        <button className="px-4 py-2 bg-blue-500 text-white">Search Artists</button>
      </Link>
      <Link to="/search_songs">
        <button className="ml-4 px-4 py-2 bg-red-500 text-white">Search Songs</button>
      </Link>

      {/* Top 10 Artists */}
      <div className="font-black text-4xl">Top 10 Tracks</div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {topTracks &&
          topTracks.tracks.track
            .slice(0, 10)
            .map((item: Track, index: number) => {
              if (index < 3) {
                return (
                  <div
                    key={index}
                    className="rounded-md shadow p-4 flex items-center gap-10"
                  >
                    <div className="ml-4 font-bold text-4xl">{index + 1}</div>
                    <div className="leading-loose">
                      <div className="text-xl md:text-4xl font-bold">
                        {item.name}
                      </div>
                      <div className="text-lg text-gray-500">
                        {item.artist.name}
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="rounded-md shadow p-4 flex items-center gap-10"
                  >
                    <div className="ml-4 font-bold text-lg">{index + 1}</div>
                    <div className="leading-loose">
                      <div className="text-xl font-bold">{item.name}</div>
                      <div className="text-lg text-gray-500">
                        {item.artist.name}
                      </div>
                    </div>
                  </div>
                );
              }
            })}
      </div>

      {/* Top 10 Artists */}
      <div className="font-black text-4xl mt-10">Top 10 Artists</div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {topArtists &&
          topArtists.artists.artist
            .slice(0, 10)
            .map((item: Artist, index: number) => {
              if (index < 3) {
                return (
                  <div
                    key={index}
                    className="rounded-md shadow p-4 flex items-center gap-10"
                  >
                    <div className="ml-4 font-bold text-4xl">{index + 1}</div>
                    <div className="text-xl font-bold">{item.name}</div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="rounded-md shadow p-4 flex items-center gap-10"
                  >
                    <div className="ml-4 font-bold text-lg">{index + 1}</div>
                    <div className="text-xl font-normal">{item.name}</div>
                  </div>
                );
              }
            })}
      </div>
    </div>
  );
}

export default App;
