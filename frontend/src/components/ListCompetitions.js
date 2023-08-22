import React from "react";
import { useNavigate } from "react-router-dom";

function ListCompetitions(props) {
  const navigate = useNavigate();

  return (
    <div className="border border-nightsky-900 mt-2">
      <div className="flex mt-1">
        <div className="w-1/2 text-light font-semibold px-2">Name</div>
        <div className="w-1/2 text-light text-right font-semibold px-2">
          Competitors
        </div>
      </div>
      {props.competitions &&
        props.competitions.map((competition, index) => (
          <div
            key={index}
            className="flex my-2 hover:bg-nightsky-700"
            onClick={() => navigate(`/compid?=${competition.id}`)}
          >
            <div key={index} className="w-1/2 text-light px-2">
              {competition.name}
            </div>
            <div className="w-1/2 text-light text-right px-2">
              {competition.competitors.length}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListCompetitions;
