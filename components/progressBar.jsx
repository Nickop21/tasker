import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Progressbar() {
  const [percentage, setPercentage] = useState(0);

  function calculateProgress() {
    const todoTasks = JSON.parse(localStorage.getItem("todos")) || [];
    let totalCompleted = 0;
    let arraySize = todoTasks.length;
    if (arraySize === 0) arraySize = 1;

    todoTasks.forEach((data) => {
      if (data.taskStatus) totalCompleted += 1;
    });

    const accuratePercentage = (totalCompleted / arraySize) * 100;
    setPercentage(Math.round(accuratePercentage));
  }

  useEffect(() => {
    calculateProgress();

    const updateProgressBar = () => {
      calculateProgress();
    };

    window.addEventListener("taskUpdated", updateProgressBar);
    return () => window.removeEventListener("taskUpdated", updateProgressBar);
  }, []);

  return (
    <div className="w-[100px] md:w-[180px]" style={{  margin: "0 auto" }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "black",
          pathColor: "rgb(145 229 154 / 95%)",
          trailColor: "#7A8196"
        })}
      />
    </div>
  );
}

export default Progressbar;
