import DisplayItems from "../components/displayItems";
import {
  airing_today,
  now_playing,
  popular,
  popularShows,
  trendingShows,
  upcoming,
} from "../modules/apiLinks";
import { crateDisplayItems, type ItemsCategory } from "../modules/type_files";

export default function Home() {
  const chooseWhatToDisplay: ItemsCategory[] = [
    crateDisplayItems(now_playing, "Now Playing"),
    crateDisplayItems(popular, "Popular"),
    crateDisplayItems(upcoming, "Up Coming"),
    crateDisplayItems(trendingShows, "Trending Shows"),
    crateDisplayItems(popularShows, "Popular Shows"),
    crateDisplayItems(airing_today, "On Air Today"),
  ];
  return (
    <div>
      <DisplayItems displayTags={chooseWhatToDisplay} />
    </div>
  );
}
