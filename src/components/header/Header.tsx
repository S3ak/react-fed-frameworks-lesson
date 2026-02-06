// import { useContext } from "react";
// import UserContext from "../../hooks/user/UserContext";

import useName from "../../hooks/name/nameStore";
import Nav from "../ui/nav/Nav";
import styles from "./Header.module.css";

function Header() {
  // #TODO: Fix user context
  // const user = useContext(UserContext);

  const firstName = useName((state) => state.firstName);

  return (
    <header className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.brand}>
          <h1 className={styles.title}>Learn React</h1>
        </div>

        <div className={styles.actions}>
          <button className={styles.boomButton} onClick={() => {}}>
            Cart 🛒
          </button>
        </div>
      </div>

      <div className={styles.navRow}>
        <Nav />
      </div>

      <p className={styles.welcome}>Welcome {firstName}</p>
    </header>
  );
}

export default Header;
