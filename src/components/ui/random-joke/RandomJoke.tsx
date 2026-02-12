import { useState, useEffect } from "react";

function RandomJoke() {
  const [joke, setJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Requesting JSON format
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        // If response is not 2xx, throw an error
        throw new Error(
          `Beklager, en feil oppstod: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json(); // Parse the JSON from the response
      setJoke(data.joke);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      console.error("Failed to fetch joke:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch joke when component mounts
  useEffect(() => {
    fetchJoke();
  }, []); // Empty dependency array means this effect runs once on mount

  if (isLoading) {
    return <p>Laster vits...</p>; // Loading joke...
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Dagens Vits</h2>
      {joke ? <p>{joke}</p> : <p>Ingen vits funnet.</p>}
      <button onClick={fetchJoke} disabled={isLoading}>
        Få en ny vits
      </button>
    </div>
  );
}

export default RandomJoke;
