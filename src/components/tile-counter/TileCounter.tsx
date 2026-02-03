import { useState, useEffect } from "react";

function TitleCounter() {
  const [count, setCount] = useState(0);

  // Effect Hook: Runs after every render
  useEffect(() => {
    // Side effect: Update the document title
    console.log("Updating title..."); // See when this runs
    document.title = `Teller: ${count}`;
  }); // No dependency array yet

  console.log("Rendering component..."); // See when this runs

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h2>Tittel Oppdatering</h2>
      <p>Nåværende verdi: {count}</p>
      <button onClick={handleIncrement}>Øk med 1</button>
      <p>Sjekk tittelen på nettleserfanen!</p>
    </div>
  );
}

export default TitleCounter;
