import { Link } from "@tanstack/react-router";
import Button from "../../button/Button";
import styles from "./nav.module.css";
// import { productsRoute } from "../../../routes/products/productsRoute";
// import { homeRoute } from "../../../routes/home/homeRoute";

const links = [
  {
    label: "Home",
    href: "/",
    // FIXME: cannot initialize
    // route: homeRoute,
  },
  {
    label: "Products",
    href: "/products",
    // route: productsRoute,
  },
  {
    label: "Counter",
    href: "/counter",
    // route: productsRoute,
  },
  {
    label: "Zustand",
    href: "/zustand",
    // route: productsRoute,
  },
  {
    label: "Pagination",
    href: "/pagination",
    // route: productsRoute,
  },
  {
    label: "Forms",
    href: "/forms",
    // route: productsRoute,
  },
  {
    label: "Data",
    href: "/fetching-data",
    // route: productsRoute,
  },
];

function Nav() {
  return (
    <nav className={styles.list}>
      {links.map(({ label, href }) => (
        <Link to={href} key={label}>
          <Button>{label}</Button>
        </Link>
      ))}
    </nav>
  );
}

export default Nav;
