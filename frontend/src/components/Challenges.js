import React, { useEffect, useState } from "react";
import CreateNewChallenge from "./CreateNewChallenge";
import ListChallenge from "./ListChallenge";

function Challenges(props) {
  const [creatingCompetiton, setCreatingCompetiton] = useState(false);

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
        <h3 className="text-left font-header font-bold text-xl text-ligh">
          {creatingCompetiton ? "Creating New Challenge" : "Challenges"}
        </h3>
        <button
          onClick={() => ShowCreateCompetiton()}
          className="rounded-lg bg-primary-100 hover:bg-primary-200 p-1 px-2  font-semibold 
          drop-shadow"
        >
          {creatingCompetiton ? "Close" : "Add New"}
        </button>
      </div>
      {creatingCompetiton ? (
        <CreateNewChallenge />
      ) : (
        <ListChallenge challenges={props.challenges} />
      )}
    </div>
  );
}

export default Challenges;
