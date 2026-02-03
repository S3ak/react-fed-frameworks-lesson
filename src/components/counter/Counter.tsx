import { useState } from "react";

function Counter() {
  // Initialize state variable 'count' with initial value 0
  const [count, setCount] = useState(0);

  // Function to handle the button click
  const handleIncrement = () => {
    // Update the state using the setter function
    // Pass the new value (current count + 1)
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h2>Teller</h2>
      {/* Display the current state value */}
      <p>Nåværende verdi: {count}</p>
      {/* Call handleIncrement when the button is clicked */}
      <button onClick={handleIncrement}>Øk med 1</button>
    </div>
  );
}

export default Counter;
