import React, { useState } from "react";

function App() {

  function getTimeString() {
    let currentDate = new Date();
    let hourStr = currentDate.getHours().toString();
    let minStr = currentDate.getMinutes().toString();
    let secStr = currentDate.getSeconds().toString();
    return hourStr + ":" + minStr + ":" + secStr;
  }

  const [time, setTime] = useState(getTimeString());

  function displayTime() {
    setTime(getTimeString());
  }

  setInterval(displayTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={displayTime}>Get Time</button>
    </div>
  );
}

export default App;
