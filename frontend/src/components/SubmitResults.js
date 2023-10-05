import React, { useState, useEffect } from "react";

function SubmitResults(props) {
  console.log("results", props);

  const [editedAttempts, setEditedAttempts] = useState(props.attempts);
  const [editedPoints, setEditedPoints] = useState(0);
  const [editedTime, setEditedTime] = useState(
    props.problemData.timelimit * 100 - props.time
  );

  useEffect(() => {
    if (props.top) {
      setEditedPoints(props.problemData.toppoints);
    } else if (props.zone) {
      setEditedPoints(props.problemData.zonepoints);
    } else {
      setEditedPoints(0);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("SUBMITTING");
  };

  return (
    <div
      className="z-50 w-5/6 py-2 pb-5 bg-bg-200 drop-shadow-xl backdrop-blur-sm absolute top-1/2 left-1/2 
    transform -translate-x-1/2 -translate-y-1/2 rounded-xl
    border border-text-200"
    >
      <button
        onClick={() => props.showSubmitMenu(false)}
        className="absolute top-2 right-2 font-bold text-light w-8 h-8 bg-bg-300 hover:bg-acc-400 rounded-full"
      >
        X
      </button>
      <h3 className="font-header text-text-100 text-center my-6">
        Submit Results
      </h3>
      <p className="text-center">
        Last check before saving results,
        <br />
        Edit or give extra points
      </p>
      <div>
        <form className="p-4  w-full" onSubmit={handleSubmit}>
          <label className="text-light font-semibold w-full flex justify-between my-6">
            Attempts
            <input
              className="rounded-lg pl-2 w-2/3"
              type="number"
              min="1"
              value={editedAttempts}
              onChange={(e) => setEditedAttempts(e.target.value)}
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-6">
            Time(ms)
            <input
              className="rounded-lg pl-2 w-2/3"
              type="number"
              min="1"
              value={editedTime}
              onChange={(e) => setEditedTime(e.target.value)}
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-4">
            Points
            <input
              className="rounded-lg pl-2 w-2/3"
              type="number"
              min="0"
              value={editedPoints}
              onChange={(e) => setEditedPoints(e.target.value)}
            />
          </label>
          <button
            onClick={handleSubmit}
            className="rounded-lg bg-primary-100 hover:bg-primary-200 mt-8 py-4 px-2 w-full font-semibold 
            drop-shadow"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default SubmitResults;
