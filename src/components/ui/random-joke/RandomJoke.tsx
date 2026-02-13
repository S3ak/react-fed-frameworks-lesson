import useFetch from "../../../hooks/fetch/useFetch";

//icanhazdadjoke.com/

function RandomJoke() {
  const {
    isLoading,
    error,
    data: joke,
  } = useFetch(`https://icanhazdadjoke.com/`, {
    headers: {
      Accept: "application/json",
    },
  });

  if (isLoading) {
    return <p>Laster vits...</p>; // Loading joke...
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  console.log("joke", joke);

  return (
    <div>
      <h2>Dagens Vits</h2>
      {joke ? <p>{joke.joke}</p> : <p>Ingen vits funnet.</p>}
      {/* <button onClick={fetchJoke} disabled={isLoading}>
        Få en ny vits
      </button> */}
    </div>
  );
}

export default RandomJoke;
