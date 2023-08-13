import React from "react";
import { API_URL } from "../constants";

function CreateNewCompetition() {
  const [competitionName, setCompetitionName] = React.useState("");
  const [competitors, setCompetitors] = React.useState([]);
  const [newCompetitor, setNewCompetitor] = React.useState({
    name: `Competitor ${competitors.length}`,
    skill: 0,
  });

  const addCompetitor = (e) => {
    e.preventDefault();
    setCompetitors([...competitors, newCompetitor]);

    // Reset the newCompetitor state to clear the fields
    setNewCompetitor({
      name: `Competitor ${competitors.length + 1}`,
      skill: 0,
    });
  };

  function sortCompetitors() {
    const sortedCompetitors = [...competitors].sort(
      (a, b) => a.skill - b.skill
    );
    const reversedCompetitors = sortedCompetitors.reverse();
    setCompetitors(reversedCompetitors);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompetitor({
      ...newCompetitor,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    console.log("submitting");
    event.preventDefault();

    sortCompetitors();

    let name = competitionName;

    const competitionData = {
      name,
      competitors,
    };

    try {
      const response = await fetch(`${API_URL}/api/competition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ competition: competitionData }),
      });

      if (response.ok) {
        console("Succes", response);
      } else {
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <div className="my-3">
        <label className="text-light font-semibold w-full">
          Competition Name
          <input
            className="rounded-lg text-nightsky-950 p-1 mx-10"
            placeholder="Name your Competition"
            type="text"
            name="competitionName"
            maxLength="40"
            value={competitionName}
            onChange={(e) => setCompetitionName(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="flex justify-between bg-daysky-400 border-2 border-light rounded-t-lg">
        <h3 className="text-nightsky-950 font-bold w-1/2 px-2">
          Competitor Creator{" "}
        </h3>
        <h3 className="text-nightsky-950 font-bold text-right w-1/2 px-2">
          Current Competitors: {competitors.length}
        </h3>
      </div>

      <div className="p-2 border-2 border-t-0 border-light rounded-b-lg">
        <form>
          <label className="text-light font-semibold w-full flex justify-between my-1">
            Name
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Name it"
              type="text"
              name="name"
              maxLength="25"
              value={newCompetitor.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="text-light font-semibold w-full flex justify-between my-3">
            Skill*
            <input
              className="rounded-lg text-nightsky-950 p-1 w-2/3"
              placeholder="Est Skill"
              type="number"
              name="skill"
              min="0"
              max="10"
              value={newCompetitor.skill}
              onChange={handleInputChange}
              required
            />
          </label>

          <button
            onClick={addCompetitor}
            className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold h-8 px-2 rounded-lg my-3"
          >
            Add Competitor
          </button>
          <p className="text-light w-full flex justify-between my-1">
            *Set a estimated skill level of the climber between 0-10. Higher
            skill goes first. If same, order according to entery.
          </p>
        </form>
      </div>
      <div className="flex justify-center my-2">
        <button
          className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg"
          onClick={handleSubmit}
        >
          Create Competition
        </button>
      </div>
    </div>
  );
}

export default CreateNewCompetition;
