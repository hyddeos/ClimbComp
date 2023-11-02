import React from "react";
import { API_URL } from "../constants";
import { MdGroups } from "react-icons/md";

function CreateNewCompetition(props) {
  const [competitionName, setCompetitionName] = React.useState("");
  const [competitionChallenge, setCompetitionChallenge] = React.useState(null);
  const [competitorsData, setcompetitorsData] = React.useState([]);
  const [newCompetitor, setNewCompetitor] = React.useState({
    name: ``,
    skill: 0,
  });

  const addCompetitor = (e) => {
    e.preventDefault();
    setcompetitorsData([...competitorsData, newCompetitor]);

    // Reset the newCompetitor state to clear the fields
    setNewCompetitor({
      name: ``,
      skill: 0,
    });
  };

  function sortcompetitorsData() {
    const sortedcompetitorsData = [...competitorsData].sort(
      (a, b) => a.skill - b.skill
    );
    const reversedcompetitorsData = sortedcompetitorsData.reverse();
    setcompetitorsData(reversedcompetitorsData);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompetitor({
      ...newCompetitor,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    sortcompetitorsData();

    const name = competitionName;
    const challenge_id = competitionChallenge;
    const competitors = competitorsData.map((competitor) => competitor.name);

    const competitionData = {
      name,
      challenge_id,
      competitors,
    };

    console.log("Sending", { competition: competitionData });

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/api/competition`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ competition: competitionData }),
      });

      if (response.ok) {
        console.log("Succes", response);
        window.location.reload();
      } else {
        console.log("Error...", response);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <div className="bg-bg-200 drop-shadow rounded-lg mt-2 p-2 px-4">
        {props.challenges && (
          <div className="block">
            <label className="text-text-100 font-semibold w-full">
              Name <span className="font-thin text-text-200">Competition</span>
              <input
                className="rounded-lg block my-1 mb-3 py-1 px-1 w-full border border-text-200"
                placeholder="Name your Competition"
                type="text"
                name="competitionName"
                maxLength="40"
                value={competitionName}
                onChange={(e) => setCompetitionName(e.target.value)}
                required
              />
            </label>
            <label className="text-text-100 font-semibold w-full">
              Challenge{" "}
              <span className="font-thin text-text-200">to compete in</span>
              <select
                className="rounded-lg block my-1 mb-3 py-1 px-1 w-full border border-text-200"
                name="Challenge"
                value={competitionChallenge}
                onChange={(e) => setCompetitionChallenge(e.target.value)}
                required
              >
                <option>--Select a challenge--</option>
                {props.challenges.map((challenge, index) => (
                  <option value={challenge.id}>{challenge.name}</option>
                ))}
              </select>
            </label>
          </div>
        )}
      </div>

      <div className="bg-bg-200 rounded-lg mt-4 p-2 px-4">
        <div className=" grid grid-cols-2">
          <h3 className="text-text-100 font-bold text-header px-2 cols-span-1">
            Add Competitor
          </h3>
          <div className="flex justify-end items-center px-2">
            <MdGroups size={24} className="text-text-200" />
            <span className="font-bold text-text-200 ml-2">
              {competitorsData.length}
            </span>
          </div>
        </div>

        <form className="mt-2 p-4 rounded-lg border w-full">
          <label className="text-text-100 font-semibold w-full">
            Name <span className="font-thin text-text-200">Competitor</span>
            <input
              className="rounded-lg block my-1 mb-3 py-1 px-1 w-full border border-text-200"
              placeholder="Name of the competitor"
              type="text"
              name="name"
              maxLength="25"
              value={newCompetitor.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label className="text-text-100 font-semibold w-full3">
            Skill*{" "}
            <span className="font-thin text-text-200">of the competitor</span>
            <input
              className="rounded-lg block my-1 mb-3 py-1 px-1 w-full border border-text-200"
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
            className="rounded-lg bg-primary-100 hover:bg-primary-200 p-1 px-2 w-full font-semibold 
            drop-shadow"
          >
            Add Competitor
          </button>
          <p className="text-light w-full flex justify-between my-1">
            *Set a estimated skill level of the climber between 0-10. Higher
            skill goes first. If same, order according to entery.
          </p>
        </form>
        <div className="flex justify-center my-2">
          <button
            className="h-20 rounded-lg bg-primary-100 hover:bg-primary-200 my-4 px-2 w-full font-semibold 
            drop-shadow"
            onClick={handleSubmit}
          >
            Create Competition
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateNewCompetition;
