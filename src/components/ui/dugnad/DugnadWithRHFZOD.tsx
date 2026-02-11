import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./Dugnad.module.css";

const NORWEGIAN_EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const NAME_REGEX = /^[a-zA-ZæøåÆØÅ .'-]+$/;

const DugnadFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Too short, ask your mom for a better name" })
    .max(100, { message: "Navn kan ikke være lenger enn 100 tegn." })
    .regex(NAME_REGEX, { message: "Navn inneholder ugyldige tegn." }),
  email: z
    .email({ message: "Ugyldig e-postformat." })
    .trim()
    .min(1, { message: "E-post er påkrevd." })
    .refine((value) => NORWEGIAN_EMAIL_REGEX.test(value), {
      message:
        "E-postadressen ser ikke ut til å være gyldig for dette domenet.",
    }),
  preferredTask: z.enum([
    "Hagearbeid",
    "Maling",
    "Rydding",
    "Servering av vafler",
  ]),
  bringsTools: z.boolean(),
  paymentMethod: z.enum(["Vipps", "Kort", "Faktura"]),
});

const initialState = {
  name: "",
  email: "",
  bringsTools: false,
  preferredTask: "Hagearbeid" as const,
  paymentMethod: "Vipps" as const,
};

type Inputs = z.infer<typeof DugnadFormSchema>;

function RHFDugnadFormWithZOD() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, dirtyFields },
    reset,
  } = useForm<Inputs>({
    mode: "onBlur",
    resolver: zodResolver(DugnadFormSchema),
    defaultValues: initialState,
  });

  const onSubmit = async (formData: Inputs) => {
    await fetch("https://dummyjson.com/http/200", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate the content type
      },
      body: JSON.stringify(formData), // Convert the JavaScript object to a JSON string
    });

    alert(
      `Takk, ${formData.name}! Din påmelding for dugnad med ${formData.preferredTask} er registrert.`,
    );
    reset();
  };

  const onError = (
    formErrors: Partial<Record<keyof Inputs, { message?: string }>>,
  ) => {
    console.log("Skjemavalideringsfeil:", formErrors);
    // Optional: focus the first field with an error
    const firstErrorField = Object.keys(formErrors)[0];
    if (firstErrorField) {
      const fieldElement = document.getElementsByName(firstErrorField)[0];
      if (fieldElement) {
        fieldElement.focus();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={styles.form}>
      <h2 className={styles.heading}>Dugnad Påmelding (React Hook Form)</h2>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          Fullt navn:
        </label>
        <input
          id="name"
          className={`${styles.input} ${!errors.name && dirtyFields.name ? styles.isValid : ""}`}
          autoComplete="name"
          {...register("name")}
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby="nameError"
        />
        {errors.name && (
          <p role="alert" id="nameError" className={styles.error}>
            {errors.name.message}
          </p>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          E-post:
        </label>
        <input
          id="email"
          type="email"
          className={`${styles.input} ${!errors.email && dirtyFields.email ? styles.isValid : ""}`}
          {...register("email")}
          aria-invalid={errors.email ? "true" : "false"}
        />
        {errors.email && (
          <p role="alert" className={styles.error}>
            {errors.email.message}
          </p>
        )}
      </div>
      <div className={styles.field}>
        <label htmlFor="preferredTask" className={styles.label}>
          Ønsket oppgave:
        </label>
        <select
          id="preferredTask"
          className={`${styles.select} ${!errors.preferredTask && dirtyFields.preferredTask ? styles.isValid : ""}`}
          {...register("preferredTask")}
          aria-invalid={errors.preferredTask ? "true" : "false"}
        >
          <option value="Hagearbeid">Hagearbeid (Gardening)</option>
          <option value="Maling">Maling (Painting)</option>
          <option value="Rydding">Rydding (Cleaning/Tidying)</option>
          <option value="Servering av vafler">
            Servering av vafler (Serving waffles)
          </option>
        </select>
        {errors.preferredTask && (
          <p role="alert" className={styles.error}>
            {errors.preferredTask.message}
          </p>
        )}
      </div>
      <div className={styles.checkboxRow}>
        <input type="checkbox" id="bringsTools" {...register("bringsTools")} />
        <label htmlFor="bringsTools">Jeg kan ta med eget verktøy</label>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Velg betalingsmåte:</label>
        <div className={styles.radioGroup}>
          <label
            className={`${styles.radioLabel} ${!errors.paymentMethod && dirtyFields.paymentMethod ? styles.isValid : ""}`}
          >
            <input type="radio" value="Vipps" {...register("paymentMethod")} />
            Vipps
          </label>
          <label
            className={`${styles.radioLabel} ${!errors.paymentMethod && dirtyFields.paymentMethod ? styles.isValid : ""}`}
          >
            <input type="radio" value="Kort" {...register("paymentMethod")} />
            Bankkort
          </label>
          <label
            className={`${styles.radioLabel} ${!errors.paymentMethod && dirtyFields.paymentMethod ? styles.isValid : ""}`}
          >
            <input
              type="radio"
              value="Faktura"
              {...register("paymentMethod")}
            />
            Faktura
          </label>
        </div>
      </div>
      ;
      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sender inn..." : "Meld deg på"}
      </button>
    </form>
  );
}

export default RHFDugnadFormWithZOD;
