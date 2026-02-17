// import { useState } from "react";
// import oldGamesData from "../../../data/games.json";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type {
  FetchGames,
  oldGamesAPIResponseObject,
} from "../../../hooks/old-games/oldGamesTypes";
import type { Game } from "./game";
import GameItem from "./GameItemServerSide";
import PaginationControls from "./PaginationControls";
import { useState } from "react";

const ITEMS_PER_PAGE = 4;
const API_BASE_URL = "https://v2.api.noroff.dev/old-games";

async function fetchGames(
  currentPage = 1,
  limit = ITEMS_PER_PAGE,
): Promise<FetchGames> {
  const response = await fetch(
    `${API_BASE_URL}?page=${currentPage}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

function PaginatedGameListWithTS() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error, refetch } =
    useQuery<oldGamesAPIResponseObject>({
      queryKey: ["old-games", currentPage],
      queryFn: () => fetchGames(currentPage),
      placeholderData: keepPreviousData,
    });

  console.log("data", data);

  const handlePageChange = (pageNumber: number) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      console.log("pageNumber", pageNumber);
      setCurrentPage(pageNumber);
      refetch();
    }
  };

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Someting went wrong</div>;
  }

  if (!data) {
    return <div>There are no games bro</div>;
  }

  const games = data.data;
  const totalItems = data.meta.totalCount;
  const totalPages = data.meta.pageCount;

  if (games.length === 0) {
    return <p>Ingen spill funnet i databasen.</p>; // No games found
  }

  return (
    <div>
      <h1>Classic Games Collection (Tanstack Query)</h1>

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

export default PaginatedGameListWithTS;
