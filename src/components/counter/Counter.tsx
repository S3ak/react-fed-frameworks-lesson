import useCounter from "../../hooks/counter/counterStore";

function Counter() {
  const count = useCounter((state) => state.count);

  // Function to handle the button click
  const handleIncrement = useCounter((state) => state.increament);
  const handleDescrement = useCounter((state) => state.decreament);
  const handleReset = useCounter((state) => state.setCount);

  return (
    <div>
      <h2>Teller</h2>
      {/* Display the current state value */}
      <p>Nåværende verdi: {count}</p>
      {/* Call handleIncrement when the button is clicked */}
      <section>
        <button onClick={() => handleIncrement()}>+</button>
        <button onClick={handleDescrement}>-</button>
        <button onClick={() => handleReset()}>Reset</button>
        <button
          onClick={() => {
            handleIncrement(5);
          }}
        >
          increase by 5
        </button>
      </section>
    </div>
  );
}

export default Counter;
