import useCounter from "../../../hooks/counter/counterStore";
import Counter from "../../counter/Counter";

function CounterPage() {
  const count = useCounter((state) => state.count);
  const innerLayer = useCounter((state) => state.codeName.innerLayer);
  return (
    <div>
      <h1>The counter page is currently {count}</h1>
      <p>Nested value is: {innerLayer}</p>
      <Counter />
    </div>
  );
}

export default CounterPage;
