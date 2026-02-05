import { Link } from "@tanstack/react-router";
import Button from "../../button/Button";

function Nav() {
  return (
    <nav>
      <Link to="/">
        <Button>Home</Button>
      </Link>
      <Link to="/products">
        <Button>Products</Button>
      </Link>
    </nav>
  );
}

export default Nav;
