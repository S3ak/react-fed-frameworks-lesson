import { useState, useEffect, useCallback, useRef } from "react";
import GameItem from "./GameItemServerSide";

const API_BASE_URL = "https://v2.api.noroff.dev/old-games";
const ITEMS_PER_PAGE = 4; // Number of items to fetch per API call

function GamesWithInfiniteScroll() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const observer = useRef();
  const lastGameElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore],
  );

  // Renamed from loadMoreItems to fetchAndSetGames for clarity
  const fetchAndSetGames = useCallback(async () => {
    if (!hasMore && page > 1) return; // Don't fetch if no more data, unless it's the initial load (page 1)

    setIsLoading(true);
    setError(null);
    console.log(`Fetching page ${page} from API`);

    try {
      const response = await fetch(
        `${API_BASE_URL}?page=${page}&limit=${ITEMS_PER_PAGE}`,
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.errors?.[0]?.message ||
            `HTTP error! status: ${response.status}`,
        );
      }
      const result = await response.json();

      setGames((prevGames) => {
        // Prevent duplicates if API somehow returns overlapping items on quick succession
        const newGames = result.data.filter(
          (newGame) =>
            !prevGames.some((prevGame) => prevGame.id === newGame.id),
        );
        return [...prevGames, ...newGames];
      });

      // The API meta object contains pageCount and currentPage
      setHasMore(result.meta.currentPage < result.meta.pageCount);
    } catch (err) {
      console.error("Failed to fetch games:", err);
      setError(err.message);
      setHasMore(false); // Stop trying to load more if there's an error
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    // This effect will run when page changes (due to observer) or when hasMore status changes
    // which might trigger fetchAndSetGames if conditions inside it are met.
    // The actual fetch is triggered by the observer setting the page.
    // For the very first load, we need an initial trigger.
    fetchAndSetGames();
  }, [page]);

  return (
    <div>
      <h1>Classic Games (Endless Scroll)</h1>
      <div
        style={{
          maxHeight: "600px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "10px",
        }}
      >
        {games.map((game, index) => {
          if (games.length === index + 1) {
            // If it's the last game element
            return (
              <div ref={lastGameElementRef} key={game.id}>
                <GameItem game={game} />
              </div>
            );
          } else {
            return <GameItem key={game.id} game={game} />;
          }
        })}
        {isLoading && (
          <p style={{ textAlign: "center", padding: "20px" }}>
            Loading more games...
          </p>
        )}
        {!hasMore && games.length > 0 && !isLoading && (
          <p style={{ textAlign: "center", padding: "20px" }}>
            You've seen all the games!
          </p>
        )}
        {error && (
          <p style={{ color: "red", textAlign: "center", padding: "20px" }}>
            Error: {error}
          </p>
        )}
        {games.length === 0 && !isLoading && !error && (
          <p>No games to display.</p>
        )}
      </div>
    </div>
  );
}

export default GamesWithInfiniteScroll;
