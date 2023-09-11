import React from "react";
import { API_URL } from "../constants";

function CreateNewChallenge() {
  const [challengeName, setChallengeName] = React.useState("");
  const [problems, setProblems] = React.useState([]);
  const [newProblem, setNewProblem] = React.useState({
    name: "",
    type: "boulder", // Default type is 'boulder', other sportclimb
    grade: "",
    position: "",
    timelimit: 240, // Default is 4 min,
    zonepoints: 3,
    toppoints: 9,
  });

  const addProblem = (e) => {
    e.preventDefault();
    if (
      newProblem.name &&
      newProblem.grade &&
      newProblem.type &&
      newProblem.timelimit &&
      newProblem.zonepoints &&
      newProblem.toppoints
    ) {
      setProblems([...problems, newProblem]);
    } else {
      console.log("Error, problems not corretly added");
    }

    // Reset the newProblem state to clear the fields
    setNewProblem({
      name: "",
      type: "boulder",
      grade: "",
      position: "",
      timelimit: 240,
      zonepoints: 3,
      toppoints: 6,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "type" && value === "sport") {
      // If the type is set to "sportclimb", hide zonepoints and set its value to 0
      setNewProblem({
        ...newProblem,
        [name]: value,
        zonepoints: 0,
      });
    } else {
      // If the type is set to "boulder", show zonepoints and set its value back to 3
      const intValue =
        name === "toppoints" || name === "zonepoints"
          ? parseInt(value, 10)
          : value;
      setNewProblem({
        ...newProblem,
        [name]: intValue,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let name = challengeName;

    const challengeData = {
      name,
      problems,
    };

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/challenge`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ challenge: challengeData }),
      });
      console.log("respone", response);
      if (response.ok) {
        console.log("Succes", response);
        window.location.reload();
      } else {
        console.log("error, refill");
        setChallengeName("");
        setProblems([]);
      }
    } catch (error) {
      console.error("Error", error);
      localStorage.removeItem("authToken");
    }
  };

  return (
    <div>
      <div className="my-3">
        <label className="text-light font-semibold w-full">
          Challenge Name
          <input
            className="rounded-lg text-nightsky-950 p-1 mx-10"
            placeholder="Name your Challege"
            type="text"
            name="challengeName"
            maxLength="40"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="flex justify-between bg-daysky-400 border-2 border-light rounded-t-lg">
        <h3 className="text-nightsky-950 font-bold w-1/2 px-2">
          Problem Creator{" "}
        </h3>
        <h3 className="text-nightsky-950 font-bold text-right w-1/2 px-2">
          Current Problems: {problems.length}
        </h3>
      </div>

      <div className="p-2 border-2 border-t-0 border-light rounded-b-lg">
        <form>
          <label className="text-light font-semibold w-full flex justify-between my-1">
            Name(Color)
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Name it"
              type="text"
              name="name"
              maxLength="25"
              value={newProblem.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-3">
            Type
            <select
              className="rounded-lg w-2/3 p-1 text-nightsky-950"
              name="type"
              value={newProblem.type}
              onChange={handleInputChange}
              required
            >
              <option value="boulder">Boulder</option>
              <option value="sport">Sport Climb</option>
            </select>
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-3">
            Grade
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Problem grade"
              type="text"
              name="grade"
              value={newProblem.grade}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-1">
            Position
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Where is it located"
              type="text"
              name="position"
              maxLength="25"
              value={newProblem.position}
              onChange={handleInputChange}
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-3">
            Top Points
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Points for getting the top"
              type="number"
              name="toppoints"
              value={newProblem.toppoints}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-3">
            Zone Points
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Points for getting the top"
              type="number"
              name="zonepoints"
              value={newProblem.zonepoints}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-3">
            Time Limit(sec)
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Time limit for problem"
              type="number"
              name="timelimit"
              value={newProblem.timelimit}
              onChange={handleInputChange}
              required
            />
          </label>
          <button
            onClick={addProblem}
            className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold h-8 px-2 rounded-lg my-3"
          >
            Add Problem
          </button>
        </form>
      </div>
      <div className="flex justify-center my-2">
        <button
          className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg"
          onClick={handleSubmit}
        >
          Create Challenge
        </button>
      </div>
    </div>
  );
}

export default CreateNewChallenge;
