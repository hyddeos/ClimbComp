import React from "react";

function ListCompetitions(props) {
  return (
    <div className="bg-nightsky-950 p-6 mt-4">
      <h3 className="text-left font-body font-extrabold text-xl text-light">
        Competitions
      </h3>
      <div className="border border-nightsky-900 flex">
        <div className="w-1/2 text-light font-semibold px-2">Name</div>
        <div className="w-1/2 text-light font-semibold px-2">Challange</div>
        <div className="w-1/8 text-light font-semibold px-2">Live</div>
      </div>
    </div>
  );
}

export default ListCompetitions;
