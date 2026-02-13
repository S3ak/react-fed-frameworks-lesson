import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./CreateProductForm.module.css";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJlbWlseXMiLCJlbWFpbCI6ImVtaWx5LmpvaG5zb25AeC5kdW1teWpzb24uY29tIiwiZmlyc3ROYW1lIjoiRW1pbHkiLCJsYXN0TmFtZSI6IkpvaG5zb24iLCJnZW5kZXIiOiJmZW1hbGUiLCJpbWFnZSI6Imh0dHBzOi8vZHVtbXlqc29uLmNvbS9pY29uL2VtaWx5cy8xMjgiLCJpYXQiOjE3NzA5MDIyMDEsImV4cCI6MTc3MDkwNTgwMX0.-CgvbCcpeDAYWri0r6vOoKHlmBO1ZzcuKiN_MDuOSnk";

// Define the product schema with validation rules
const productSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0.01, "Price must be greater than 0"),
  discountPercentage: z
    .number({ invalid_type_error: "Discount must be a number" })
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%"),
  rating: z
    .number({ invalid_type_error: "Rating must be a number" })
    .min(0, "Rating cannot be negative")
    .max(5, "Rating cannot exceed 5"),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .int("Stock must be a whole number")
    .min(0, "Stock cannot be negative"),
});

type ProductFormData = z.infer<typeof productSchema>;

function CreateProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      price: 0,
      discountPercentage: 0,
      rating: 0,
      stock: 0,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      console.log("Form submitted:", data);

      // Here you would typically make an API call to create the product
      const res = await fetch("https://dummyjson.com/auth/products/add", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      alert("Product created successfully!" + responseData);
      reset(); // Reset form after successful submission
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className={styles.input}
            placeholder="e.g., Essence Mascara Lash Princess"
          />
          {errors.title && (
            <span className={styles.error}>{errors.title.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>
            Description *
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={4}
            className={styles.textarea}
            placeholder="Enter product description..."
          />
          {errors.description && (
            <span className={styles.error}>{errors.description.message}</span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category" className={styles.label}>
            Category *
          </label>
          <input
            id="category"
            type="text"
            {...register("category")}
            className={styles.input}
            placeholder="e.g., beauty"
          />
          {errors.category && (
            <span className={styles.error}>{errors.category.message}</span>
          )}
        </div>

        <div className={styles.gridRow}>
          <div className={styles.formGroup}>
            <label htmlFor="price" className={styles.label}>
              Price * ($)
            </label>
            <input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={styles.input}
              placeholder="9.99"
            />
            {errors.price && (
              <span className={styles.error}>{errors.price.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="discountPercentage" className={styles.label}>
              Discount (%)
            </label>
            <input
              id="discountPercentage"
              type="number"
              step="0.01"
              {...register("discountPercentage", { valueAsNumber: true })}
              className={styles.input}
              placeholder="7.17"
            />
            {errors.discountPercentage && (
              <span className={styles.error}>
                {errors.discountPercentage.message}
              </span>
            )}
          </div>
        </div>

        <div className={styles.gridRow}>
          <div className={styles.formGroup}>
            <label htmlFor="rating" className={styles.label}>
              Rating (0-5)
            </label>
            <input
              id="rating"
              type="number"
              step="0.01"
              {...register("rating", { valueAsNumber: true })}
              className={styles.input}
              placeholder="4.94"
            />
            {errors.rating && (
              <span className={styles.error}>{errors.rating.message}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="stock" className={styles.label}>
              Stock
            </label>
            <input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className={styles.input}
              placeholder="5"
            />
            {errors.stock && (
              <span className={styles.error}>{errors.stock.message}</span>
            )}
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            {isSubmitting ? "Creating..." : "Create Product"}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProductForm;
