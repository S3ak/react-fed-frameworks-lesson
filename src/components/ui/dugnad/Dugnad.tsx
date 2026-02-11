import React, { useState } from "react";
import styles from "./Dugnad.module.css";

const initialState = {
  name: "",
  email: "",
  bringsTools: false,
  preferredTask: "Hagearbeid", // Default task
  paymentMethod: "Vipps",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function DugnadRegistrationForm() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validateField = (
    fieldName: string,
    value?: string | boolean,
  ): string => {
    let newError = "";

    if (typeof value !== "string" || !value) {
      return newError;
    }

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          newError = "Navn er påkrevd.";
        } else if (value.trim().length < 2) {
          newError = "Navn må være minst 2 tegn.";
        }
        break;
      case "email":
        if (!value.trim()) {
          newError = "E-post er påkrevd.";
        } else if (!EMAIL_REGEX.test(value)) {
          newError =
            'Ugyldig e-postformat. Forventet format er "navn@domene.no".';
        }
        break;
      // Add more cases for other fields if needed
      default:
        break;
    }
    return newError;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const target = event.target;
    const { name, value, type } = target;
    const checked =
      type === "checkbox" ? (target as HTMLInputElement).checked : undefined;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Validate on change for immediate feedback
    const fieldError = validateField(name, checked);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        paymentMethod: event.target.value,
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate name
    const nameError = validateField("name", formData.name);

    if (nameError) {
      newErrors.name = nameError;
      isValid = false;
    }

    // Validate email
    const emailError = validateField("email", formData.email);
    if (emailError) {
      newErrors.email = emailError;
      isValid = false;
    }

    // ... validate other fields as needed ...

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      console.log("Innsendte dugnadsdata:", formData);
      alert(
        `Takk, ${formData.name}! Din påmelding for dugnad er registrert. Du valgte ${formData.preferredTask}.`,
      );
      // Reset form (optional)
      setFormData(initialState);
      setErrors({});
    } else {
      console.log("Skjemavalidering feilet.");
      // Focus first field with an error (optional UX improvement)
      const firstErrorField = Object.keys(errors).find((key) => errors[key]);
      if (firstErrorField) {
        const fieldElement = document.getElementById(firstErrorField);
        if (fieldElement) {
          fieldElement.focus();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Dugnad Påmelding</h2>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Fullt navn:
        </label>
        <input
          type="text"
          id="name"
          name="name" // Crucial for generic handleChange
          value={formData.name}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          E-post:
        </label>
        <input
          type="text"
          id="email"
          name="email" // Crucial for generic handleChange
          value={formData.email}
          onChange={handleChange}
          required
          className={styles.input}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="preferredTask" className={styles.label}>
          Ønsket oppgave:
        </label>
        <select
          id="preferredTask"
          name="preferredTask"
          value={formData.preferredTask}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="Hagearbeid">Hagearbeid (Gardening)</option>
          <option value="Maling">Maling (Painting)</option>
          <option value="Rydding">Rydding (Cleaning/Tidying)</option>
          <option value="Servering av vafler">
            Servering av vafler (Serving waffles)
          </option>
        </select>
      </div>
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="bringsTools"
          name="bringsTools" // Crucial for generic handleChange
          checked={formData.bringsTools} // Use 'checked' for checkboxes
          onChange={handleChange}
        />
        <label htmlFor="bringsTools">Jeg kan ta med eget verktøy</label>
      </div>
      <div>
        <p>Velg betalingsmåte:</p>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Vipps"
            checked={formData.paymentMethod === "Vipps"}
            onChange={handlePaymentChange}
          />{" "}
          Vipps
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Kort"
            checked={formData.paymentMethod === "Kort"}
            onChange={handlePaymentChange}
          />{" "}
          Bankkort
        </label>
        <label>
          <input
            type="radio"
            name="paymentMethod"
            value="Faktura"
            checked={formData.paymentMethod === "Faktura"}
            onChange={handlePaymentChange}
          />{" "}
          Faktura
        </label>
      </div>
      ;
      <button type="submit" className={styles.submitButton}>
        Meld deg på
      </button>
    </form>
  );
}

export default DugnadRegistrationForm;
