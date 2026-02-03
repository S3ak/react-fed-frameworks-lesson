import { useContext } from "react";
import UserContext from "../../hooks/user/UserContext";

function Header() {
  const user = useContext(UserContext);
  return <h1>Velkommen, {user?.lastName}!</h1>;
}

export default Header;
