import { Outlet } from "@tanstack/react-router";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Aside from "../layouts/aside/Aside";
import styles from "./Layout.module.css";
import ShoppingCart from "../ui/nav/shopping-cart/ShoppingCart";
import useShoppingCart from "../../hooks/shopping-cart/useShoppingCart";

function Layout() {
  const isCartOpen = useShoppingCart((state) => state.isOpen);
  console.log("isCartOpen", isCartOpen);

  return (
    <div className={`${styles.layoutContainer}`}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      {isCartOpen ? (
        <Aside>
          <ShoppingCart />
        </Aside>
      ) : null}
      <Footer />
    </div>
  );
}

export default Layout;
