// import { useContext } from "react";
// import UserContext from "../../hooks/user/UserContext";

import Nav from "../ui/nav/Nav";

function Header() {
  // #TODO: Fix user context
  // const user = useContext(UserContext);

  return (
    <header>
      <Nav />
      <h1>React Website: </h1>
      <p>We are learning how to use react</p>
    </header>
  );
}

export default Header;
