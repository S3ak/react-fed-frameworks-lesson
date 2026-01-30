function ProductDisplay() {
  const productName = "Brunost";
  const price = 55.5;
  const quantity = 2;

  return (
    <>
      {/* this is suppose to be a comment */}
      <h2>Produkt: {productName}</h2>
      <p>Pris per stk: {price} NOK</p>
      <p>Antall: {quantity}</p>
      <p>Total pris: {price * quantity} NOK</p>
      <button disabled>Cannot Click</button>
    </>
  );
}

export default ProductDisplay;
