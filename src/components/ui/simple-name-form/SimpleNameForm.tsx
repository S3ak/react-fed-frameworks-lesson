import React, { useState } from "react";
import styles from "./SimpleNameForm.module.css";

function SimpleNameForm() {
  const [name, setName] = useState(""); // State to hold the input value

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default HTML form submission (page reload)
    alert(`Hei, ${name}! Ditt navn er sendt inn.`);
    setName(""); // Optionally clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="nameInput" className={styles.label}>
        Navn:
      </label>
      <input
        type="text"
        id="nameInput"
        value={name}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Send inn
      </button>
    </form>
  );
}

export default SimpleNameForm;
