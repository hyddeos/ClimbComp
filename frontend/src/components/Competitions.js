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
    <div className="p-6 mt-2">
      <div className="flex justify-between">
        <h3 className="text-left font-header font-bold text-xl text-light">
          {creatingCompetiton ? "Creating New Competition" : "Competitions"}
        </h3>
        <button
          onClick={() => ShowCreateCompetiton()}
          className="rounded-lg bg-primary-100 hover:bg-primary-200 p-1 px-2  font-semibold 
          drop-shadow"
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
