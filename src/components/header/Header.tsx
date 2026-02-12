// import { useContext } from "react";
// import UserContext from "../../hooks/user/UserContext";

import useName from "../../hooks/name/nameStore";
import useShoppingCart from "../../hooks/shopping-cart/useShoppingCart";
import Nav from "../ui/nav/Nav";
import styles from "./Header.module.css";

function Header() {
  // #TODO: Fix user context
  // const user = useContext(UserContext);
  const handleOnCartToggle = useShoppingCart(
    (state) => state.toggleCartVisibilty,
  );

  const firstName = useName((state) => state.firstName);

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Learn React</h1>
          <p className={styles.welcome}>Welcome {firstName}</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.boomButton} onClick={handleOnCartToggle}>
            Cart 🛒
          </button>
        </div>
      </div>

      <div className={styles.navRow}>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
