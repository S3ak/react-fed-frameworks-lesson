import { productRoute } from "../../../routes/products/productRoute";

function ProductDetailsPage() {
  const data = productRoute.useLoaderData();
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "2rem auto",
        padding: 24,
        border: "1px solid #eee",
        borderRadius: 12,
        boxShadow: "0 4px 18px #0001",
      }}
    >
      <div style={{ display: "flex", gap: 24 }}>
        <img
          src={data.thumbnail}
          alt={data.title}
          style={{
            width: 220,
            height: 220,
            objectFit: "cover",
            borderRadius: 10,
            background: "#fafafa",
          }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{ marginTop: 0 }}>{data.title}</h1>
          <h4 style={{ margin: 0, color: "#888" }}>
            {data.brand || "Ukjent merke"} &nbsp;•&nbsp;{" "}
            <span style={{ textTransform: "capitalize" }}>{data.category}</span>
          </h4>
          <p style={{ margin: "1.2rem 0" }}>{data.description}</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 10,
            }}
          >
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "#1976d2",
              }}
            >
              {data.price} kr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
