import React from "react";

function CreateNewChallenge() {
  const [challengeName, setChallengeName] = React.useState("");
  const [problems, setProblems] = React.useState([]);
  const [newProblem, setNewProblem] = React.useState({
    name: "",
    type: "boulder", // Default type is 'boulder', other sportclimb
    grade: "",
    position: "",
    timeLimit: 240, // Default is 4 min,
    zone: true,
    zonePoints: 3,
    topPoints: 6,
  });

  function addProblem() {
    setProblems([...problems, newProblem]);
    setNewProblem({
      name: "",
      type: "boulder", // Default type is 'boulder', other sportclimb
      grade: "",
      position: "",
      timeLimit: 240, // Default is 4 min,
      zone: true,
      zonePoints: 3,
      topPoints: 6,
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProblem({ ...newProblem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProblem();
    console.log("submitting");
  };

  return (
    <div>
      <div className="my-3">
        <label className="text-light font-semibold w-full">
          Challenge Name
          <input
            className="rounded-lg text-nightsky-950 p-1"
            placeholder="Name your Challege"
            type="text"
            name="challengeName"
            value={challengeName}
            onChange={(e) => setChallengeName(e.target.value)}
            required
          />
        </label>
      </div>
      <h3 className="text-light font-semibold w-full">Problem Creator</h3>
      <div className="p-2 border-2 border-light rounded-lg">
        <form>
          <label className="text-light font-semibold w-full flex justify-between my-1">
            Name
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Name it"
              type="text"
              name="problemName"
              value={newProblem.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-2">
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
          <label className="text-light font-semibold w-full flex justify-between my-1">
            Grade
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="What grade?"
              type="text"
              name="problemName"
              value={newProblem.grade}
              onChange={handleInputChange}
              required
            />
          </label>
          <button
            className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold h-6 px-2 rounded-lg"
            type="submit"
          >
            Add Problem
          </button>
        </form>
      </div>
      <div className="flex justify-center my-2">
        <button
          className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg"
          type="submit"
        >
          Create Challange
        </button>
      </div>
    </div>
  );
}

export default CreateNewChallenge;
