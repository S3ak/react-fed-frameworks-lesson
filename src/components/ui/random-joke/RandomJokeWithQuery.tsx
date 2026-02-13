import { useQuery } from "@tanstack/react-query";

function RandomJokeWithQuery() {
  const {
    error,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    status,
    data: joke,
  } = useQuery({
    queryKey: ["joke"],
    queryFn: async () => {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  console.warn(`
    error,${error}
    isLoading,${isLoading}
    isFetching,${isFetching}
    isSuccess,${isSuccess}
    isError,${isError}
    status,${status}
    data: joke,${joke}
  `);

  if (isLoading) {
    return <p>Laster vits...</p>; // Loading joke...
  }

  if (error) {
    return <p style={{ color: "red" }}>{error?.message}</p>;
  }

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

export default RandomJokeWithQuery;
