import React from "react";
import { API_URL } from "../constants";
import { MdQuiz } from "react-icons/md";

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
    <>
      <div className="bg-bg-200 rounded-lg mt-2 p-2 px-4">
        <label className="text-text-100 font-semibold w-full">
          Name <span className="font-thin text-text-200">of the Challenge</span>
          <input
            className="rounded-lg block my-1 mb-3 py-1 px-1 w-full border border-text-200"
            placeholder="Challenge name"
            type="text"
            name="challengeName"
            maxLength="40"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="bg-bg-200 rounded-lg mt-4 p-2 px-4">
        <div className=" grid grid-cols-2">
          <h3 className="text-text-100 font-bold text-header px-2 cols-span-1">
            Add Competitor
          </h3>
          <div className="flex justify-end items-center px-2">
            <MdQuiz size={24} className="text-text-200" />
            <span className="font-bold text-text-200 ml-2">
              {problems.length}
            </span>
          </div>
        </div>
        <form className="mt-2 p-4 rounded-lg border w-full">
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
    </>
  );
}

export default CreateNewChallenge;
