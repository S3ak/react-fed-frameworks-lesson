import { Link, useNavigate } from "@tanstack/react-router";
import { productsRoute } from "../../../routes/products/productsRoute";
import Card from "../../card/Card";
import type { Product } from "../../../types";
import styles from "./productListPage.module.css";

export default function ProductListPage() {
  // Get the validated search parameters for this route
  // The hook knows 'query' is string|undefined and 'page' is number
  const { query, page, sortByPrice } = productsRoute.useSearch();
  const navigate = useNavigate();
  const { products }: { products: Product[] } = productsRoute.useLoaderData();

  // Filter products based on the validated query
  const filteredProducts = query
    ? products.filter((p) =>
        p.title.toLowerCase().includes(query.toLowerCase()),
      )
    : products;

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortByPrice === "asc") {
      return a.price - b.price;
    }
    if (sortByPrice === "desc") {
      return b.price - a.price;
    }
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
      <ul>
        {sortedProducts.map((product) => (
          <div key={product.id} className={styles.productList}>
            <Link
              to="/products/$productId"
              params={{
                productId: product.id,
              }}
            >
              <Card title={product.title}>{product.price}</Card>
            </Link>
          </div>
        ))}
      </ul>

      {/* Input/Links to change search params would go here (see next section) */}
    </div>
  );
}
