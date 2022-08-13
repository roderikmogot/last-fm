import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchSongs from "./routes/search_songs";
import SearchArtist from "./routes/search_artists";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <div className="mt-4 text-center text-2xl md:text-4xl font-black">
      Music Stats App
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search_songs" element={<SearchSongs />} />
        <Route path="/search_artists" element={<SearchArtist />} />
      </Routes>
    </BrowserRouter>
  </>
);
