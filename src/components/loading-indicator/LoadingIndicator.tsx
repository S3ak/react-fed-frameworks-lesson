import { useState } from "react";

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section>
      <div>{isLoading ? <p>Laster...</p> : <p>Lastet!</p>}</div>
      <button onClick={() => setIsLoading((prev) => !prev)}>
        Simuler Lasting Ferdig
      </button>
    </section>
  );
}
