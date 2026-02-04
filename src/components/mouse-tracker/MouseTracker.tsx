import { useEffect, useState } from "react";

function MouseTracker() {
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setMousePos({
        x: e.clientX,
        y: e.clientY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <h2>MouseTracker</h2>
      <p>X: {mousePos.x}</p>
      <p>Y: {mousePos.y}</p>
    </div>
  );
}

export default MouseTracker;
