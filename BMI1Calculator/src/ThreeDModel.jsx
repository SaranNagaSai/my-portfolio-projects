import React, { useEffect, useState } from "react";
import "./ThreeDModel.css";

export default function ThreeDModel({ stopRotation, bmiMessage }) {
  const [isRotating, setIsRotating] = useState(true);
  const [displayMessage, setDisplayMessage] = useState("");

  useEffect(() => {
    if (stopRotation) {
      setIsRotating(false);
      setDisplayMessage(bmiMessage);

      setTimeout(() => {
        setIsRotating(true);
        setDisplayMessage(""); // Remove the message after resuming rotation
      }, 1000); // Resume rotation after 1 second
    }
  }, [stopRotation, bmiMessage]);

  return (
    <div className={`image-container ${isRotating ? "rotate" : ""}`}>
      {displayMessage && <div className="bmi-message">{displayMessage}</div>}
    </div>
  );
}
