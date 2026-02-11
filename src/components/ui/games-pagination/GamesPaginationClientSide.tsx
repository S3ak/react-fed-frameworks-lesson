import { useState } from "react";
import oldGamesData from "../../../data/games.json";
import GameItem from "./GameItemClientSide";
import PaginationControls from "./PaginationControls";

const ITEMS_PER_PAGE = 4;

function PaginatedGameListClientSide() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = oldGamesData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // Calculate the items for the current page
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = oldGamesData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <h1>Classic Games Collection (Client Side)</h1>

      {currentItems.map((game) => (
        <GameItem key={game.id} game={game} />
      ))}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <p>
        Showing page {currentPage} of {totalPages}
      </p>
    </div>
  );
}

export default PaginatedGameListClientSide;
