import React from "react";
import CreateNewChallenge from "./CreateNewChallenge";
import ListCompetitions from "./ListCompetitions";

function Challenges(props) {
  const [creatingCompetiton, setCreatingCompetiton] = React.useState(false);

  function ShowCreateCompetiton() {
    if (!creatingCompetiton) {
      setCreatingCompetiton(true);
      console.log("true");
    } else {
      setCreatingCompetiton(false);
      console.log("false");
    }
  }
  return (
    <div className="bg-nightsky-950 p-6 mt-4">
      <div className="flex justify-between">
        <h3 className="text-left font-body font-extrabold text-xl text-light">
          {creatingCompetiton ? "Creating Challenge" : "Challenges"}
        </h3>
        <button
          onClick={() => ShowCreateCompetiton()}
          className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-24 h-6 rounded-lg"
        >
          {creatingCompetiton ? "Close" : "Add New"}
        </button>
      </div>
      {creatingCompetiton ? <CreateNewChallenge /> : <ListCompetitions />}
    </div>
  );
}

export default Challenges;
