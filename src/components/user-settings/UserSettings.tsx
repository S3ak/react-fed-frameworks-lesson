import { useContext, useState } from "react";
import UserContext from "../../hooks/user/UserContext";

export default function UserSettings() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { firstName } = useContext(UserContext);

  return (
    <div>
      <p>Tema: {theme}</p>
      <p>Hey User: {firstName}</p>
      <button
        onClick={() =>
          setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
        }
      >
        Bytt Tema
      </button>
      <hr />
      <p>Varsler: {notificationsEnabled ? "På" : "Av"}</p>
      <button onClick={() => setNotificationsEnabled(!notificationsEnabled)}>
        {notificationsEnabled ? "Slå av varsler" : "Slå på varsler"}
      </button>
    </div>
  );
}
