import { Children } from "react";

function Button({ children = "Click me" }: { children?: React.ReactNode }) {
  return <button>{children}</button>;
}

export default Button;
