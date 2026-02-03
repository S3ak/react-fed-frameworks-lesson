import React, { useState } from "react";

function NameInput() {
  const [name, setName] = useState("");

  // Event handler receives the event object 'e'
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update state with the input field's current value
    setName(e.target.value);
  };

  return (
    <div>
      <label htmlFor="nameInput">Navn: </label>
      <input
        type="text"
        id="nameInput"
        value={name} // Controlled component: input value reflects state
        onChange={handleChange} // Update state when input changes
      />
      <p>Du skrev: {name}</p>
    </div>
  );
}

export default NameInput;
