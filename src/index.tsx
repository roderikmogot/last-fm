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
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/search_songs" element={<SearchSongs />} />
      <Route path="/search_artists" element={<SearchArtist />} />
    </Routes>
  </BrowserRouter>
);
