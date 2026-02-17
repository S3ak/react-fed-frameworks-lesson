import { useState } from "react";
import styles from "./ToggleMessage.module.css";

export default function ToggleMessage({
  children,
  message,
}: {
  children?: React.ReactNode;
  message?: string;
}) {
  const [isVisible, setIsVibible] = useState(true);

  const handleIsVisible = () => {
    setIsVibible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <div className={isVisible ? styles.isVisible : styles.isHidden}>
      <>
        <p role="heading">{message}</p>
        {children}
        <button onClick={handleIsVisible}>Vis/Skjul Melding</button>
      </>
    </div>
  );
}
