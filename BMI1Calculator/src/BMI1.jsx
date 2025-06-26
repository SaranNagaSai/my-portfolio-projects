import { useState } from "react";
import "./BMI1.css";
import ThreeDModel from "./ThreeDModel"; // Importing the 3D Model component

export default function BMI1() {
  const [actionButton, setActionButton] = useState("Calculate BMI");
  const [bmiMessage, setBMIMessage] = useState(""); // Message for 3D model
  const [stopRotation, setStopRotation] = useState(false); // To control rotation
  const [backgroundClass, setBackgroundClass] = useState("background-img"); // Updated variable

  const [bmiform, setBMIform] = useState({
    fullName: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setBMIform({
      ...bmiform,
      [name]: value,
    });
    setBMIMessage(""); // Reset BMI message on new input
    setActionButton("Calculate BMI"); // Reset button text on input change
  };

  const onCalculateBMI = (event) => {
    event.preventDefault();

    if (!bmiform.fullName || !bmiform.age || !bmiform.gender || !bmiform.weight || !bmiform.height) {
      alert("Please enter all the required data.");
      return;
    }

    setActionButton("Calculating...");

    setTimeout(() => {
      let weight = Number(bmiform.weight);
      let height = Number(bmiform.height) / 100;
      let bmi = (weight / (height * height)).toFixed(2);
      let category = "";
      let message = "";

      if (bmiform.age === "child") {
        category = "Refer to BMI Percentiles for Age";
      } else if (bmiform.age === "adult") {
        if (bmi < 18.5) {
          category = "Underweight";
          setBackgroundClass("underweight-bg"); // Updated variable usage
          message = `You need to gain ${(18.5 * height * height - weight).toFixed(2)} kg.`;
        } else if (bmi >= 18.5 && bmi < 24.9) {
          category = "Normal weight";
          setBackgroundClass("normal-weight-bg");
          message = "You have a healthy weight.";
        } else if (bmi >= 24.9 && bmi < 29.9) {
          category = "Overweight";
          setBackgroundClass("overweight-bg");
          message = `You need to lose ${(weight - 24.9 * height * height).toFixed(2)} kg.`;
        } else {
          category = "Obese";
          setBackgroundClass("obese-bg");
          message = `You need to lose ${(weight - 24.9 * height * height).toFixed(2)} kg.`;
        }
      }

      setActionButton(`${bmi} - ${category}`);
      setBMIMessage(message);
      setStopRotation(true); // Stop rotation when calculation is done

      setTimeout(() => {
        setStopRotation(false); // Resume rotation after 1 second
        setActionButton("Calculate BMI"); // Reset button text
      }, 1000);
      
    }, 2500);
  };

  return (
    <div className={`holder ${backgroundClass}`}>
      <div className="box">
        <form onSubmit={onCalculateBMI}>
          <h2>BMI Calculator</h2>
          <div className="input-field">
            <label>Full Name</label>
            <input type="text" name="fullName" value={bmiform.fullName} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Age Category</label>
            <select name="age" value={bmiform.age} onChange={handleChange}>
              <option value="">Select Age Category</option>
              <option value="child">Child (2-18 years)</option>
              <option value="adult">Adult (19-64 years)</option>
              <option value="senior">Senior (65+ years)</option>
            </select>
          </div>
          <div className="input-field">
            <label>Gender</label>
            <select name="gender" value={bmiform.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="input-field">
            <label>Weight (kg)</label>
            <input type="number" step="0.01" name="weight" value={bmiform.weight} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label>Height (cm)</label>
            <input type="number" step="0.01" name="height" value={bmiform.height} onChange={handleChange} />
          </div>
          <button type="submit">{actionButton}</button>
        </form>
        <ThreeDModel stopRotation={stopRotation} bmiMessage={bmiMessage} />
      </div>
    </div>
  );
}
