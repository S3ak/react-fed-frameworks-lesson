import { useState, useEffect } from "react";

function IntervalTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log("Setting up interval...");
    // Setup: Start an interval timer
    const intervalId = setInterval(() => {
      console.log("Interval tick");
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000); // Update every second

    // Cleanup: Clear the interval
    return () => {
      console.log("Cleaning up interval...");
      clearInterval(intervalId);
    };
  }, []); // Empty array: Setup interval on mount, clear on unmount

  return (
    <div>
      <h2>Timer</h2>
      <p>Sekunder: {seconds}</p>
    </div>
  );
}

export default IntervalTimer;
