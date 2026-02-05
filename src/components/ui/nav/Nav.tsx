import { Link } from "@tanstack/react-router";
import Button from "../../button/Button";
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
];

function Nav() {
  return (
    <nav>
      {links.map(({ label, href }) => (
        <Link to={href} key={label}>
          <Button>{label}</Button>
        </Link>
      ))}
    </nav>
  );
}

export default Nav;
