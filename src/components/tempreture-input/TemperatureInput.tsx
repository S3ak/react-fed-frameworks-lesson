import React from "react";

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const handleChange = (e) => {
    // Call the function passed down from the parent
    onTemperatureChange(e.target.value);
  };

  return (
    <fieldset style={{ marginBottom: "10px" }}>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input
        value={temperature} // Value controlled by parent state
        onChange={handleChange} // Notify parent on change
      />
    </fieldset>
  );
}

export default TemperatureInput;
