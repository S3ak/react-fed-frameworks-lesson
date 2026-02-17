import AddTodoForm from "../../ui/create-todo/CreateTodo";
import CreateTodoFormWithTQRHF from "../../ui/create-todo/CreateTodoWithZODRHF";
import ErrorBoundary from "../../ui/error-boundary/ErrorBoundary";
import GamesManager from "../../ui/game-master/GameMaster";
import PaginatedGameListWithTS from "../../ui/games-pagination/GamesPaginationTQ";
import UserFavoriteGames from "../../ui/games/FavouriteGame";
import Game from "../../ui/games/Game";
// import RandomJokeWithQuery from "../../ui/random-joke/RandomJokeWithQuery";

function TanstackQueryPage() {
  return (
    <div>
      <ErrorBoundary>
        <PaginatedGameListWithTS />
        {/* <GamesManager /> */}
        {/* <CreateTodoFormWithTQRHF /> */}
        {/* <UserFavoriteGames userId={"1"} /> */}
        {/* <Game gameId={1} /> */}
        {/* <RandomJokeWithQuery /> */}
        {/* <AddTodoForm /> */}
      </ErrorBoundary>
    </div>
  );
}

export default TanstackQueryPage;
