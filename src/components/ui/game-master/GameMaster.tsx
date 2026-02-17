import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./GameMaster.module.css";

// --- Mock API functions ---
const mockGames = [
  {
    id: "1",
    name: "The Incredible Machine",
    released: "1993",
    details: "Original details for TIM",
  },
  {
    id: "2",
    name: "Lemmings",
    released: "1991",
    details: "Original details for Lemmings",
  },
];

const fetchGames = async () => {
  console.log("API: Fetching all games");
  return [...mockGames];
};

const fetchGameById = async (id) => {
  console.log(`API: Fetching game ${id}`);
  const game = mockGames.find((g) => g.id === id);
  if (!game) throw new Error("Game not found");
  return { ...game };
};

const updateGameApi = async ({ id, updatedData }) => {
  console.log(`API: Updating game ${id} with`, updatedData);
  const gameIndex = mockGames.findIndex((g) => g.id === id);
  if (gameIndex === -1) throw new Error("Game to update not found");
  mockGames[gameIndex] = { ...mockGames[gameIndex], ...updatedData };
  return { ...mockGames[gameIndex] };
};
// --- End Mock API ---

function EditGameForm({ game, onDone }) {
  const queryClient = useQueryClient();
  const [name, setName] = useState(game.name);
  const [details, setDetails] = useState(game.details);

  const updateMutation = useMutation({
    mutationFn: updateGameApi, // Expects an object like { id, updatedData }
    onSuccess: (updatedGameData, variables) => {
      // variables is { id, updatedData }
      console.log("Game updated, invalidating queries for:", variables.id);

      // Strategy 1: Invalidate both the list and the specific item query
      queryClient.invalidateQueries({ queryKey: ["oldGames"] }); // Invalidate the whole list
      queryClient.invalidateQueries({ queryKey: ["game", variables.id] }); // Invalidate specific game

      // Strategy 2 (More targeted update if API returns full updated item):
      // Update the cache directly for the specific item
      //   queryClient.setQueryData(['game', variables.id], updatedGameData);
      // And still invalidate the list if the list might change due to this update (e.g. sorting)
      //   queryClient.invalidateQueries({ queryKey: ['oldGames'] });

      alert("Spill oppdatert!");
      onDone();
    },
    onError: (error) => alert(`Feil: ${error.message}`),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({ id: game.id, updatedData: { name, details } });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.editForm}>
      <h4>Redigerer: {game.name}</h4>
      <div className={styles.formGroup}>
        <label>
          Navn:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formGroup}>
        <label>
          Detaljer:
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.formActions}>
        <button
          type="submit"
          disabled={updateMutation.isPending}
          className={styles.saveButton}
        >
          {updateMutation.isPending ? "Lagrer..." : "Lagre"}
        </button>
        <button
          type="button"
          onClick={onDone}
          disabled={updateMutation.isPending}
          className={styles.cancelButton}
        >
          Avbryt
        </button>
      </div>
    </form>
  );
}

function GameListItem({ gameId }) {
  const { data: game, isLoading } = useQuery({
    queryKey: ["game", gameId],
    queryFn: () => fetchGameById(gameId),
  });
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading)
    return <li className={styles.loading}>Laster spill {gameId}...</li>;
  if (!game)
    return <li className={styles.loading}>Spill {gameId} ikke funnet.</li>;

  return (
    <li className={styles.gameItem}>
      {isEditing ? (
        <EditGameForm game={game} onDone={() => setIsEditing(false)} />
      ) : (
        <div className={styles.gameContent}>
          <div className={styles.gameInfo}>
            <span className={styles.gameName}>{game.name}</span>{" "}
            <span className={styles.gameYear}>({game.released})</span>
            <div className={styles.gameDetails}>Detaljer: {game.details}</div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className={styles.editButton}
          >
            Rediger
          </button>
        </div>
      )}
    </li>
  );
}

function GamesManager() {
  const { data: games, isLoading } = useQuery({
    queryKey: ["oldGames"],
    queryFn: fetchGames,
  });
  if (isLoading) return <p className={styles.loading}>Laster spill...</p>;
  return (
    <div className={styles.container}>
      <ul className={styles.gamesList}>
        {games?.map((game) => (
          <GameListItem key={game.id} gameId={game.id} />
        ))}
      </ul>
    </div>
  );
}

export default GamesManager;
