import { Link, useNavigate } from "@tanstack/react-router";
import { productsRoute } from "../../../routes/products/productsRoute";
import Card from "../../card/Card";
import type { Product } from "../../../types";
import styles from "./productListPage.module.css";
import { currencyFormatter } from "../../../utils/numbers";
import useShoppingCart from "../../../hooks/shopping-cart/useShoppingCart";

export default function ProductListPage() {
  // Get the validated search parameters for this route
  // The hook knows 'query' is string|undefined and 'page' is number
  const { query, page, sortByPrice } = productsRoute.useSearch();
  const navigate = useNavigate();
  const { products }: { products: Product[] } = productsRoute.useLoaderData();
  const addToCart = useShoppingCart((state) => state.addItem);
  const formattedProducts = products.map((x) => ({
    ...x,
    discountedPrice: x.discountPercentage
      ? Number((x.price * (1 - x.discountPercentage / 100)).toFixed(2))
      : null,
  }));

  console.log("formattedProducts", formattedProducts);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  // Filter products based on the validated query
  const filteredProducts = query
    ? formattedProducts.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()),
      )
    : formattedProducts;

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortByPrice === "asc") {
      return a.price - b.price;
    }
    if (sortByPrice === "desc") {
      return b.price - a.price;
    }
    return 0;
  });

  // (Pagination logic would use the 'page' parameter here)

  return (
    <div>
      <h1>Produktliste</h1>
      <p>(Side: {page})</p>
      <p>Søkefilter: {query ? `"${query}"` : "Ingen"}</p>

      <section title="search section">
        <input
          type="text"
          onChange={(e) => {
            navigate({
              search: {
                query: e.target.value,
              },
            });
          }}
        />
      </section>

      <section title="filter">
        <select
          name="sortByPrice"
          id="sortByPrice"
          onChange={(e) => {
            console.log("value", e.target.value);
            navigate({
              search: {
                sortByPrice: e.target.value,
              },
            });
          }}
        >
          <option value="reset">---</option>
          <option value="asc">Price rising</option>
          <option value="desc">Price descending</option>
        </select>
      </section>

      {/* Display filtered products */}
      <section className={styles.productGrid}>
        {sortedProducts.map((product) => {
          return (
            <div key={product.id}>
              <Card className={styles.card}>
                <Link
                  to="/products/$productId"
                  params={{
                    productId: product.id,
                  }}
                >
                  <img src={product.thumbnail} alt="" />
                  <h2>{product.title}</h2>

                  <strong className={styles.priceDisplayRow}>
                    <span
                      className={
                        product.discountedPrice
                          ? styles.cancelledPrice
                          : styles.originalPrice
                      }
                    >
                      {currencyFormatter(product.price)}
                    </span>

                    <span>
                      {product.discountedPrice
                        ? currencyFormatter(product.discountedPrice)
                        : null}
                    </span>
                  </strong>

                  <div>
                    <div>{makeStars(product.rating)}</div>{" "}
                    {product.rating.toFixed(1)}/5
                  </div>

                  <div>{product.stock > 0 ? <div>🟢 In Stock</div> : null}</div>
                </Link>

                <section className={styles.controlSection}>
                  <button
                    className={styles.addToCartButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </button>
                </section>
              </Card>
            </div>
          );
        })}
      </section>

      {/* Input/Links to change search params would go here (see next section) */}
    </div>
  );
}

function makeStars(rating: number) {
  const roundedVal = Math.floor(rating);
  const arr = new Array(roundedVal).fill("⭐");

  return (
    <>
      {arr.map((star, idx) => (
        <span key={idx}>{star}</span>
      ))}
    </>
  );
}
