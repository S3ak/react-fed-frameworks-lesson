import PaginatedGameListClientSide from "../../ui/games-pagination/GamesPaginationClientSide";
import GamesWithInfiniteScroll from "../../ui/games-pagination/GamesPaginationServerSideWithInifinteScroll";
import GamesPaginationServerSide from "../../ui/games-pagination/GamesPaginationServerSideWithStore";
import SimpleInifiniteScroll from "../../ui/simple-infinite-scroll/SimpleInifiniteScroll";
import SimpleCountyList from "../../ui/simple-pagination-example/SimplePaginationExample";

function PaginationPage() {
  return (
    <div>
      <GamesWithInfiniteScroll />
      {/* <SimpleInifiniteScroll />
      <GamesPaginationServerSide />
      <PaginatedGameListClientSide />
      <SimpleCountyList /> */}
    </div>
  );
}

export default PaginationPage;
