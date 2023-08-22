import React from "react";
import CreateNewCompetition from "./CreateNewCompetition";
import ListCompetitions from "./ListCompetitions";

function Competitions(props) {
  const [creatingCompetiton, setCreatingCompetiton] = React.useState(false);

  function ShowCreateCompetiton() {
    if (!creatingCompetiton) {
      setCreatingCompetiton(true);
    } else {
      setCreatingCompetiton(false);
    }
  }
  return (
    <div className="bg-nightsky-950 p-6 mt-4">
      <div className="flex justify-between">
        <h3 className="text-left font-body font-extrabold text-xl text-light">
          {creatingCompetiton ? "Creating New Competition" : "Competitions"}
        </h3>
        <button
          onClick={() => ShowCreateCompetiton()}
          className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-24 h-6 rounded-lg"
        >
          {creatingCompetiton ? "Close" : "Start New"}
        </button>
      </div>
      {creatingCompetiton ? (
        <CreateNewCompetition challenges={props.challenges} />
      ) : (
        <ListCompetitions competitions={props.competitions} />
      )}
    </div>
  );
}

export default Competitions;
