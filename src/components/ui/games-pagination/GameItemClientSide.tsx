function GameItem({
  game,
}: {
  game: {
    name: string;
    year: string;
    genre: string;
  };
}) {
  return (
    <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
      <h3>{game.name}</h3>
      <p>Year: {game.year}</p>
      <p>Genre: {game.genre}</p>
    </div>
  );
}

export default GameItem;
