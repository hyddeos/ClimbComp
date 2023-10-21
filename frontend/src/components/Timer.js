import React, { useState, useEffect } from "react";

function Timer(props) {
  const [time, setTime] = useState(props.timelimit * 100);
  const [resetCounter, setResetCounter] = useState(0);
  const [timeMessage, setTimeMessage] = useState("");

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning && time > 0) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time - 1), 10);
    } else {
      setIsRunning(false);
      props.setSaveTime(time);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setTime(props.timelimit * 100);
    props.setNewCompetitor(false);
  };

  useEffect(() => {
    if (props.newCompetitor) {
      resetTimer();
    }
  }, [props.newCompetitor]);

  const reset = () => {
    if (resetCounter === 3) {
      setTime(props.timelimit * 100);
      setTimeMessage("");
      setResetCounter(0);
    } else {
      setResetCounter(resetCounter + 1);
      setTimeMessage("Press Reset-button 3 times to reset");
    }
  };
  const resetTimerNewCompetitor = () => {
    setTime(props.timelimit * 100);
  };
  return (
    <div className="bg-bg-200 drop-shadow rounded-lg mt-2 py-1">
      <h3 className="text-text-100 text-center font-header">Timer</h3>
      <p className="text-center text-6xl text-light">
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}:
        {milliseconds.toString().padStart(2, "0")}
      </p>
      <div className="flex justify-evenly my-4">
        {" "}
        <button
          drop-shadow
          className="bg-primary-100 hover:bg-accent-100 text-light font-body font-bold w-28 h-16 p-3 rounded-lg"
          onClick={startAndStop}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button
          className="bg-primary-100 hover:bg-primary-200 text-light font-body font-bold w-28 h-16 p-3 rounded-lg"
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
