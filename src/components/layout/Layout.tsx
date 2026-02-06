import { Outlet } from "@tanstack/react-router";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Aside from "../layouts/aside/Aside";
import styles from "./Layout.module.css";
import ShoppingCart from "../ui/nav/shopping-cart/ShoppingCart";

function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Aside>
        <ShoppingCart />
      </Aside>
      <Footer />
    </div>
  );
}

export default Layout;
