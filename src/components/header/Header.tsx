// import { useContext } from "react";
// import UserContext from "../../hooks/user/UserContext";

import useCounter from "../../hooks/counter/counterStore";
import useName from "../../hooks/name/nameStore";
import Nav from "../ui/nav/Nav";

function Header() {
  // #TODO: Fix user context
  // const user = useContext(UserContext);

  const handleBoom = useCounter((state) => state.increament);
  const firstName = useName((state) => state.firstName);

  return (
    <header>
      <Nav />
      <button
        onClick={() => {
          handleBoom(1000000000);
        }}
      >
        BOOM!
      </button>
      <h1>React Website</h1>
      <p>Welcome {firstName}</p>
      <p>We are learning how to use react</p>
    </header>
  );
}

export default Header;
