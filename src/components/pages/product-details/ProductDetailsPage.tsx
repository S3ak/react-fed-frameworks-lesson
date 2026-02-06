import { productRoute } from "../../../routes/products/productRoute";
import styles from "./ProductDetailsPage.module.css";

function ProductDetailsPage() {
  const data = productRoute.useLoaderData();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={data.thumbnail} alt={data.title} className={styles.image} />
        <div className={styles.details}>
          <h1 className={styles.title}>{data.title}</h1>
          <h4 className={styles.metadata}>
            {data.brand || "Ukjent merke"} &nbsp;•&nbsp;{" "}
            <span className={styles.category}>{data.category}</span>
          </h4>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{data.price} kr</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
