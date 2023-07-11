import React, { useState, useEffect } from "react";

function Timer(props) {
  const [time, setTime] = useState(props.timelimit);
  const [resetCounter, setResetCounter] = useState(0);
  const [timeMessage, setTimeMessage] = useState("");

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time - 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    if (resetCounter == 5) {
      setTime(0);
      setTimeMessage("");
      setResetCounter(0);
    } else {
      setResetCounter(resetCounter + 1);
      setTimeMessage("Press Rest-button 5 times to rest clock");
    }
  };
  return (
    <div className="bg-nightsky-950 p-4">
      <p className="text-center text-7xl text-light">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="flex justify-evenly my-4">
        {" "}
        <button
          className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg"
          onClick={startAndStop}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="bg-acc-800 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg"
          onClick={reset}
        >
          Reset
        </button>
      </div>
      <h5 className="text-error font-bold text-center">{timeMessage}</h5>
    </div>
  );
}

export default Timer;
