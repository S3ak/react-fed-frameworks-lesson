import { useState, useEffect } from "react";

function SafeCounter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    // TODO: Refactor this line
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    // TODO: Refactor this line
    setCount((prev) => prev - 1);
  };

  // Bonus: Add a button that tries to increment 5 times rapidly
  const handleIncrementFive = () => {
    handleIncrement();
    handleIncrement();
    handleIncrement();
    handleIncrement();
    handleIncrement();
    // Observe if this increments by 5 with the initial implementation vs refactored one
  };

  useEffect(() => {
    // Your side effect code goes here.
    // This function runs AFTER the component renders.
    console.log("Component has rendered or updated.");
    document.title = `Current count is ${count}`;
  }); // No dependency array here yet - runs after EVERY render

  console.log("Rendering component..."); // See when this runs

  return (
    <div>
      <h2>Sikker Teller</h2>
      <p>Verdi: {count}</p>
      <button onClick={handleIncrement}>Øk (+1)</button>
      <button onClick={handleDecrement}>Mink (-1)</button>
      <button onClick={handleIncrementFive}>Øk (+5)</button> {/* Bonus */}
    </div>
  );
}

export default SafeCounter;
