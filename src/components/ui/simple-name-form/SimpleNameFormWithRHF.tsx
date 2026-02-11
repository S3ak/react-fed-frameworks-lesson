import { useForm, type SubmitHandler } from "react-hook-form";
import styles from "./SimpleNameForm.module.css";

type Inputs = {
  nameInput: string;
};

function RHFSimpleNameForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({
    mode: "onBlur", // Validate on blur
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // React Hook Form doesn't automatically clear fields on submit,
    // you'd use reset() for that if needed:

    const res = await fetch("https://dummyjson.com/http/200", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Indicate the content type
      },
      body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
    });

    const resData = await res.json();

    alert(
      `Hei, ${data.nameInput}! Ditt navn er sendt inn via React Hook Form.`,
    );
    console.log("Data", resData);

    reset(); // if you import reset from useForm
  };

  const onError = (
    formErrors: Partial<Record<keyof Inputs, { message?: string }>>,
  ) => {
    console.log("Valideringsfeil:", formErrors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
      <label htmlFor="nameInput" className={styles.label}>
        Navn: (React Hook Form)
      </label>
      <input
        id="nameInput"
        // Register the input. "name" is the key for this field in form data.
        {...register("nameInput", {
          required: "Cannot be empty.", // Custom error message for required
          minLength: {
            value: 2,
            message: "Navn må være minst 2 tegn.", // Custom message for minLength
          },
        })}
        aria-invalid={errors.nameInput ? "true" : "false"}
        aria-describedby="nameErrorRHF"
      />
      {/* Display error message for the 'name' field */}
      {errors.nameInput && (
        <p
          id="nameErrorRHF"
          role="alert"
          style={{ color: "red", fontSize: "0.9em" }}
        >
          {errors.nameInput.message}
        </p>
      )}
      <button type="submit" className={styles.button} disabled={isSubmitting}>
        Send inn
      </button>
    </form>
  );
}

export default RHFSimpleNameForm;
