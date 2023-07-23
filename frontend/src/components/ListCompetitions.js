import React from "react";
import CreateNewCompetition from "./CreateNewChallenge";

function ListCompetitions(props) {
  return (
    <div className="border border-nightsky-900 flex mt-2">
      <div className="w-1/2 text-light font-semibold px-2">Name</div>
      <div className="w-1/2 text-light font-semibold px-2">Challange</div>
      <div className="w-1/8 text-light font-semibold px-2">Live</div>
    </div>
  );
}

export default ListCompetitions;
