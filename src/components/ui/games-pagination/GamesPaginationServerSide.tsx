// import { useState } from "react";
// import oldGamesData from "../../../data/games.json";
import type { Game } from "./game";
import GameItem from "./GameItemServerSide";
import PaginationControls from "./PaginationControls";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 4;
const API_BASE_URL = "https://v2.api.noroff.dev/old-games";

function PaginatedGameList() {
  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchGames = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${API_BASE_URL}?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,
          {
            signal,
          },
        );

        if (!response.ok) {
          let errorMessage = `API-forespørsel feilet: ${response.status} ${response.statusText}`;

          try {
            const errorData = await response.json();
            if (errorData?.errors[0]?.message) {
              errorMessage = errorData?.errors[0]?.message;
            }
          } catch (jsonError) {
            console.warn("Could not parse error response as JSON:", jsonError);
          }
          throw new Error(`HTTP error! status: ${errorMessage}`);
        }

        const result = await response.json();

        setGames(result.data || []); // The API returns items in 'data'
        // The API returns pagination info in 'meta'
        if (result.meta) {
          setCurrentPage(result.meta.currentPage);
          setTotalPages(result.meta.pageCount);
          setTotalItems(result.meta.totalCount);
        } else {
          // Fallback if meta is not available for some reason or for single page results
          setTotalPages(1);
          setTotalItems(result.data.length);
        }
      } catch (err) {
        // Ignore AbortError - this is expected when cleanup aborts the request
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Request was cancelled");
          return;
        }

        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        console.error("Failed to fetch games:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();

    return () => {
      controller.abort();
    };
  }, [currentPage]); // Re-fetch when currentPage changes

  const handlePageChange = (pageNumber: number) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== currentPage
    ) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) {
    return <div>...loading</div>;
  }

  if (error) {
    return <div>Someting went wrong</div>;
  }

  if (games.length === 0) {
    return <p>Ingen spill funnet i databasen.</p>; // No games found
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
