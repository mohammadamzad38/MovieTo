import type React from "react";
import type { DataTypes, ItemsCategory } from "../modules/type_files";
import { useEffect, useState } from "react";
import axios from "axios";

interface DisplayItemsProps {
  displayTags: ItemsCategory[];
}

const DisplayItems: React.FC<DisplayItemsProps> = ({ displayTags }) => {
  return (
    <div className="flex flex-col flex-wrap justify-between gap-4 bg-gray-900">
      {displayTags.map(({ apiEndpoint, itemHeading }) => (
        <CategorySection
          key={apiEndpoint}
          itemHeading={itemHeading}
          apiEndpoint={apiEndpoint}
        />
      ))}
    </div>
  );
};
export default DisplayItems;

const CategorySection: React.FC<ItemsCategory> = ({
  apiEndpoint,
  itemHeading,
}) => {
  const [apiData, setApiData] = useState<DataTypes[]>([]);

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await axios.get(apiEndpoint);
        setApiData(response.data.results);
      } catch (error) {
        console.error("Faild to fetch API Data", error);
      }
    };
    fetchApiData();
  }, [apiEndpoint]);

  return (
    <>
      <div className="bg-gray-900">
        <div className="my-6 text-center  bg-gradient-to-l from-gray-1000 to-gray-700">
          <h1 className="font-bold lg:text-2xl text-natural-50 text-start bg-gradient-to-l from gray-100 to-gray-900 p-4 py-4 mb-20 text-white">
            {itemHeading}
          </h1>

          <div className="flex flex-wrap w-full justify-evenly space-x-0 mt-1 mx-4 items-center">
            {apiData.map((movie) => (
              <div
                key={movie.id}
                className="text-neutral-300 mb-6 space-y-4 flex hover:shadow-[0px_1px_5px_1px_#ffea0076] items-center flex-col bg-slate-0 rounded-lg pt-4 mt-4 w-64 h-[24rem] m-1 cursor-pointer scale-95 hover-scale-100"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt="alt"
                  className="rounded-lg"
                />

                <div className="p-1 ">
                  <p className="text-xl font-bold truncate-text">
                    {movie.title}
                  </p>
                </div>
                <div className="pb-2 ">
                  <p className="text-xl font-bold truncate-text">
                    {movie.name}
                  </p>
                </div>
                <p className="flex items-center justify-center rounded-md w-14 relative right-[6.5rem] bottom-[25.5rem] font-semibold text-lg text-black bg-[#ffea00] ">
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
