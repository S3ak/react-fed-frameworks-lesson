import useShoppingCart from "../../../../hooks/shopping-cart/useShoppingCart";
import styles from "./ShoppingCart.module.css";

export default function ShoppingCart() {
  const sumAmount = useShoppingCart((state) => state.sumAmount);
  const totalAmount = useShoppingCart((state) => state.totalAmount);
  const itemCount = useShoppingCart((state) => state.itemCount);
  const items = useShoppingCart((state) => state.items);
  const updateQuantity = useShoppingCart((state) => state.updateQuantity);
  const handleOnCartClose = () => {};
  const handleGotoCheckout = () => {};
  const handleRemoveCartItem = useShoppingCart((state) => state.removeItem);
  const handleDecreaseQuantity = (product) => {
    updateQuantity(product, -1);
  };
  const handleIncreaseQuantity = (product) => {
    updateQuantity(product, +1);
  };
  const handleRestCart = useShoppingCart((state) => state.resetCart);

  return (
    <div className={styles.cartContainer}>
      <section className={styles.header}>
        <h2 className={styles.headerTitle}>Shopping Cart ({itemCount})</h2>
        <button className={styles.closeButton} onClick={handleOnCartClose}>
          ✕
        </button>
      </section>

      <section className={styles.itemsList}>
        {items.map((product) => {
          const { id, title, thumbnail, price, quantity } = product;
          return (
            <div key={id} className={styles.cartItem}>
              <section className={styles.cartItemFirstRow}>
                <div className={styles.imageContainer}>
                  <img src={thumbnail} alt={title} />
                </div>

                <div className={styles.itemInfo}>
                  <h3 className={styles.itemTitle}>{title}</h3>
                  <p className={styles.itemPrice}>{price}</p>
                </div>
              </section>

              <section className={styles.cartItemLastRow}>
                <div className={styles.itemActions}>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleRemoveCartItem(product)}
                  >
                    🗑️
                  </button>

                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleDecreaseQuantity(product)}
                    >
                      -
                    </button>
                    <p className={styles.quantity}>{quantity}</p>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleIncreaseQuantity(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </section>
            </div>
          );
        })}
      </section>

      <section className={styles.footer}>
        <p className={styles.summaryLine}>
          <span>Sum:</span>
          <span>{sumAmount} kr</span>
        </p>
        <p className={styles.totalLine}>
          <span>Total (incl VAT):</span>
          <span>{totalAmount} kr</span>
        </p>
        <button className={styles.clearCartButton} onClick={handleRestCart}>
          Clear cart
        </button>
        <button className={styles.checkoutButton} onClick={handleGotoCheckout}>
          Go to Checkout
        </button>
      </section>
    </div>
  );
}
