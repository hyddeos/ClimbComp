import React, { useState, useEffect } from "react";
import { API_URL } from "../constants";

function SubmitResults(props) {
  console.log("results", props);

  const [editedAttempts, setEditedAttempts] = useState(props.attempts);
  const [editedPoints, setEditedPoints] = useState(0);
  const calculatedTime = props.problemData.timelimit * 100 - props.time;
  const [editedTime, setEditedTime] = useState(
    calculatedTime === 0 ? props.problemData.timelimit * 100 : calculatedTime
  );

  const lastResult = (e) => {
    // Check if the competion is over after this competitor
    if (props.current_problem === props.total_problems) {
      let notDoneLastProblem = 0;
      props.scoredata.forEach((competitor) => {
        if (competitor.problems < props.total_problems) {
          notDoneLastProblem++;
        }
      });
      if (notDoneLastProblem === 1) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (props.top) {
      setEditedPoints(props.problemData.toppoints);
    } else if (props.zone) {
      setEditedPoints(props.problemData.zonepoints);
    } else {
      setEditedPoints(0);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("What LastResult is:,", lastResult());

    const result = {
      competitor: props.competitor,
      challenge_id: props.challenge_id,
      competition_id: props.competition_id,
      problem_id: props.problemData.id,
      points: editedPoints,
      time: editedTime,
      attempts: editedAttempts,
      last_result: lastResult(),
    };

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ result: result }),
      });
      console.log("respone", response);

      if (response.ok) {
        console.log("Succes", response);
      }
    } catch (error) {
      console.error("Error", error);
      localStorage.removeItem("authToken");
    }
    console.log("SUBMITTING", { result: result });
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
