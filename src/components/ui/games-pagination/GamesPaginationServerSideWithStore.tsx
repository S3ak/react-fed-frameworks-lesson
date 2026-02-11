import useOldGames from "../../../hooks/old-games/useOldGames";
import GameItem from "./GameItemServerSide";
import PaginationControls from "./PaginationControls";
import { useEffect } from "react";

const ITEMS_PER_PAGE = 4;

function PaginatedGameList() {
  const games = useOldGames((state) => state.items);
  const currentPage = useOldGames((state) => state.currentPage);
  const totalPages = useOldGames((state) => state.totalPages);
  const totalItems = useOldGames((state) => state.totalItems);
  const isLoading = useOldGames((state) => state.isLoading);
  const error = useOldGames((state) => state.error);
  const fetchGames = useOldGames((state) => state.getPageItems);
  const onPageChange = useOldGames((state) => state.pageChange);

  useEffect(() => {
    fetchGames(currentPage, ITEMS_PER_PAGE);
  }, [currentPage, fetchGames]); // Re-fetch when currentPage changes

  const handlePageChange = (pageNumber: number) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      onPageChange(pageNumber);
    }
  };

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Someting went wrong</div>;
  }

  return (
    <div>
      <h1>Classic Games Collection (Server Side)</h1>

      {games.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <p>
        Showing page {currentPage} of {totalPages}. Total Items: {totalItems}
      </p>
    </div>
  );
}

export default PaginatedGameList;
