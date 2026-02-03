import { useState, useEffect } from "react";

function InputLogger() {
  const [inputValue, setInputValue] = useState("");
  const [foo, setFoo] = useState(false);

  useEffect(() => {
    console.warn("Input Value >>>", inputValue);
  }, [inputValue]);

  useEffect(() => {
    console.warn("foo is >>>", foo);
  }, [foo]);

  return (
    <div>
      <h2>InputLogger</h2>
      <form>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
        />
      </form>
      <button onClick={() => setFoo((prev) => !prev)}>Click me</button>
    </div>
  );
}

export default InputLogger;
