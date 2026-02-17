import { useQueries, useQuery } from "@tanstack/react-query";

type ID = string | number;

// TODO: implement userQueries

// --- Assume fetchGameById is defined as in the previous example ---
const fetchGameById = async (gameId: ID) => {
  if (!gameId) return null; // Or throw error, depending on how you want to handle
  const response = await fetch(`https://v2.api.noroff.dev/old-games/${gameId}`);
  if (!response.ok) {
    console.error(`Failed to fetch game ${gameId}: ${response.status}`);
    return null; // Return null on error for individual item
  }
  const result = await response.json();
  return result.data;
};

// --- Mock function to fetch favorite game IDs ---
const fetchFavoriteGameIds = async (userId: ID) => {
  console.log(`Fetching favorite game IDs for user ${userId}...`);
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (userId) {
        resolve([1, 3, 5]); // User 123 likes games with ID 1, 3, 5
      } else {
        resolve([]);
      }
    }, 500);
  });
};

// --- Component for a single favorite game item ---
function FavoriteGameItem({ queryData }) {
  const { isLoading, isError, data: game } = queryData;

  const { gameId } = game;

  if (isLoading) return <li>Laster favorittspill ID: {gameId}...</li>;
  if (isError)
    return (
      <li style={{ color: "orange" }}>
        Kunne ikke laste spill ID {gameId}: {error?.message || "Ukjent feil"}
      </li>
    );
  if (!game)
    return (
      <li style={{ color: "grey" }}>
        Spill ID {gameId} ikke funnet eller utilgjengelig.
      </li>
    );

  return (
    <li style={{ border: "1px solid green", margin: "5px", padding: "5px" }}>
      <strong>{game.name}</strong> ({game.released})
    </li>
  );
}

// --- Main component to display all favorite games ---
export default function UserFavoriteGames({ userId }: { userId: ID }) {
  const {
    data: favoriteGameIds = [],
    isLoading: isLoadingIds,
    isError: isErrorIds,
    error: errorIds,
  } = useQuery({
    queryKey: ["userFavorites", userId],
    queryFn: () => fetchFavoriteGameIds(userId),
    enabled: !!userId,
  });

  const results = useQueries({
    queries: favoriteGameIds.map((id) => ({
      queryKey: ["game", id],
      queryFn: () => fetchGameById(id),
      staleTime: Infinity,
    })),
  });

  if (isLoadingIds) return <p>Laster favorittliste...</p>;
  if (isErrorIds)
    return (
      <p style={{ color: "red" }}>
        Feil ved henting av favoritter: {errorIds.message}
      </p>
    );
  if (!favoriteGameIds || favoriteGameIds.length === 0) {
    return <p>Du har ingen favorittspill enda.</p>;
  }

  console.log("results");

  return (
    <div>
      <h3>Dine Favorittspill</h3>
      <ul>
        {results.map((queryData, idx) => {
          debugger;
          return (
            <FavoriteGameItem key={queryData.id} queryData={results[idx]} />
          );
        })}
      </ul>
    </div>
  );
}
