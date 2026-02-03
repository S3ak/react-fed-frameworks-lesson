import { useState } from "react";

export default function UserSettings() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  // ... logic to change theme and toggle notifications ...

  return (
    <div>
      <p>Tema: {theme}</p>
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
