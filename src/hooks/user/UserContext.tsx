import { createContext } from "react";
import type { OptionalUser } from "../../types";

const initialData = {
  firstName: "Guest",
};

// Create a Context object
const UserContext = createContext<OptionalUser>(initialData);

export default UserContext;
