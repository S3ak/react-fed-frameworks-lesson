import type { Game } from "./game";

function GameItem({ game }: { game: Game }) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{game.name}</h3>
      <p>Year: {game.released}</p>
      <p>
        Genre: {Array.isArray(game.genre) ? game.genre.join(", ") : game.genre}
      </p>
    </div>
  );
}

export default GameItem;
