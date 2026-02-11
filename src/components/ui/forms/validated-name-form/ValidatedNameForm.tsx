import { useState } from "react";
import styles from "./ValidatedNameForm.module.css";

function ValidatedNameForm() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(""); // State for the error message

  const validateName = (currentName: string): boolean => {
    if (!currentName.trim()) {
      setNameError("Navn er påkrevd."); // Name is required
      return false;
    }
    if (currentName.trim().length < 2) {
      setNameError("Navn må være minst 2 tegn."); // Name must be at least 2 characters
      return false;
    }
    setNameError(""); // Clear error if valid
    return true;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newName = event.target.value;
    setName(newName);
    // Optional: Validate on change for immediate feedback
    // validateName(newName);
  };

  const handleBlur = (): void => {
    // Validate when the input loses focus
    validateName(name);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Validate on submit before proceeding
    if (validateName(name)) {
      alert(`Hei, ${name}! Ditt navn er sendt inn.`);
      setName(""); // Clear input
      setNameError(""); // Clear error
    } else {
      console.log("Validering feilet.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fieldGroup}>
        <label className={styles.label} htmlFor="nameInput">
          Navn:
        </label>
        <input
          className={styles.input}
          type="text"
          id="nameInput"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur} // Add onBlur handler
          aria-describedby="nameError" // For accessibility
        />
        {nameError && (
          <p id="nameError" className={styles.error}>
            {nameError}
          </p>
        )}
      </div>
      <button className={styles.button} type="submit">
        Send inn
      </button>
    </form>
  );
}

export default ValidatedNameForm;
