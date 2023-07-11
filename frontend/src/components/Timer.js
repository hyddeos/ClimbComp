import React from "react";

function Timer() {
  const Ref = React.useRef(null);

  const [timer, setTimer] = React.useState("00:00:00");

  return (
    <div>
      <p>TIMER</p>
      <h2>{timer}</h2>
      <button
        onClick={() => startTimer}
        className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg"
      >
        Start Timer
      </button>
    </div>
  );
}

export default Timer;
