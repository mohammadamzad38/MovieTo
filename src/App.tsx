import { Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Home from "./pages/home";
import Movies from "./pages/movies";
import TvShows from "./pages/tvShows";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movies" element={<Movies />} />
        <Route path="tvshows" element={<TvShows />} />
      </Routes>
    </>
  );
}

export default App;
