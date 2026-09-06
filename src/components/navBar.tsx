import axios from "axios";
import { apiKey, baseUrl, popular, popularShows } from "../modules/apiLinks";
import React, { useState } from "react";
import Logo from "../../public/image/logo.png";
import user from "../../public/image/user.png";
import { NavLink } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const NavBar = () => {
  const [movieData, setMovieData] = useState({
    backDropPath: "",
    title: "",
    overView: "",
  });
  const fetchData = async (page: string) => {
    let url = `${baseUrl}/${page}?api_Key=${apiKey}`;

    if (url === "tv") {
      url = `${popularShows}`;
    } else {
      url = `${popular}`;
    }

    try {
      const response = await axios.get(url);
      const data = await response.data;

      const randomIndex = Math.floor(Math.random() * data.results.length);
      const rendomMedia = data.results[randomIndex];

      if (rendomMedia && rendomMedia.backdrop_path) {
        setMovieData({
          backDropPath: `https://image.tmdb.org/t/p/original${rendomMedia.backdrop_path}`,
          title: rendomMedia.title || rendomMedia.name || "",
          overView: rendomMedia.overView || " ",
        });
      }
    } catch (error) {
      console.log("Error fetching Data", error);
    }
  };

  React.useEffect(() => {
    const currentPath = location.pathname;

    if (currentPath.includes("movies")) {
      fetchData("movies");
    } else if (currentPath.includes("tvshows")) {
      fetchData("tv");
    } else {
      fetchData("movies");
    }
  }, []);

  return (
    <div
      className="relative bg-cover bg-center h-screen text-white"
      style={{ backgroundImage: `url(${movieData.backDropPath})` }}
    >
      <div className="fixed p-10 left-0 top-0 w-full z-50 duration-500 ease-out bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex justify-between items-center h-24 px-6">
          <img src={Logo} className="relative xl-w-[170px] lg:w-[140px] w-32" />

          <div className="hidden md:flex space-x-10 lg:text3xl md:text-xl font-bold text-gray300">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `cursor-pointer hover:text-white ${isActive ? "text-orange-600 scale-125" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"movies"}
              className={({ isActive }) =>
                `cursor-pointer hover:text-white ${isActive ? "text-orange-600 scale-125" : ""}`
              }
            >
              Movies
            </NavLink>
            <NavLink
              to={"tvshows"}
              className={({ isActive }) =>
                `cursor-pointer hover:text-white ${isActive ? "text-orange-600 scale-125" : ""}`
              }
            >
              Tv Shows
            </NavLink>
          </div>
          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="border-none outline-none p-2 xl:w-96 lg:w-44 bg-black/50 font-bold rounded-xl text-lg text-white placeholder-natural-300"
            />
            <span className="relative -left-10  material-symbols-outlined">
              <FaSearch />
            </span>

            <img
              src={user}
              className="w-10 h-10 rounded-full cursor-pointer decoration-natural-300 ease-in-out hover:scale-100 hover:rotate-90"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
