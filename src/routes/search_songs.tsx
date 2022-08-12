import { Link } from "react-router-dom";
import { useFetch } from "../components/getData";
import { DUMMY_SEARCH_PARAMS } from "./search_artists";

const SearchSongs = () => {
  let {
    data: searchTracks,
    error,
    handler: searchHandler,
  } = useFetch("track.search", "search", `&track=${DUMMY_SEARCH_PARAMS}`);

  if (!searchTracks) {
    return <div>Loading...</div>;
  }

  console.log(searchTracks.results.trackmatches);

  return (
    <div className="p-4">
      <Link to="/">
        <button className="px-4 py-2 bg-purple-500 text-white">
          Home
        </button>
      </Link>
      <Link to="/search_artists">
        <button className="ml-4 px-4 py-2 bg-blue-500 text-white">
          Search Artists
        </button>
      </Link>
      <input
        onChange={(e) => {
          if (e.target.value.length === 0) {
            searchHandler(`&track=${DUMMY_SEARCH_PARAMS}`);
          } else {
            searchHandler("&track=" + e.target.value);
          }
        }}
        type="text"
        className="py-2 pl-4 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
        placeholder="Masukkan kata kunci"
      />
      <div className="font-bold mt-4 text-2xl">Top 10 search results</div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {searchTracks.results.trackmatches.track &&
          searchTracks.results.trackmatches.track
            .slice(0, 10)
            .map((item, index) => (
              <div
                key={index}
                className="rounded-md shadow p-4 flex items-center gap-10"
              >
                <div className="ml-4 font-bold text-2xl">{index + 1}</div>
                <div className="leading-loose">
                  <div className="text-2xl md:text-2xl font-bold">
                    {item.name}
                  </div>
                  <div className="text-lg text-gray-500">{item.artist}</div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default SearchSongs;
