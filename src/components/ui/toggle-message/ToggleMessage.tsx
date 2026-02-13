import { useState } from "react";
import styles from "./ToggleMessage.module.css";

export default function ToggleMessage({
  children,
  message,
  handleOnClick,
}: {
  children?: React.ReactNode;
  message?: string;
  handleOnClick: () => void;
}) {
  const [isVisible, setIsVibible] = useState(true);

  const handleIsVisible = () => {
    setIsVibible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <div className={isVisible ? styles.isVisible : styles.isHidden}>
      <>
        <p>{message}</p>
        {children}
        <button
          onClick={(event) => {
            console.log("event", event);
          }}
        >
          Vis/Skjul Melding
        </button>
      </>
    </div>
  );
}
