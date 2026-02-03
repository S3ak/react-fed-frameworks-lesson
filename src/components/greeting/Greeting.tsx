import React, { useState } from "react";

function Greeting({ isLoggedIn }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  let messageComponent;

  if (isLoading) {
    return <h2>Is loading</h2>;
  }

  if (isError) {
    return null;
  }

  if (isLoggedIn) {
    messageComponent = <h2>Velkommen tilbake!</h2>;
  } else {
    messageComponent = <h2>Vennligst logg inn.</h2>;
  }

  return (
    <div>
      {/* Render the component determined by the if statement */}
      {messageComponent}
    </div>
  );
}
