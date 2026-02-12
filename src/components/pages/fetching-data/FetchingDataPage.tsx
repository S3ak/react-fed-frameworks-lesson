import PaginatedGameList from "../../ui/games-pagination/GamesPaginationServerSide";
import RandomJoke from "../../ui/random-joke/RandomJoke";

function FetchingDataPage() {
  return (
    <div>
      <PaginatedGameList />
      <RandomJoke />
    </div>
  );
}

export default FetchingDataPage;
