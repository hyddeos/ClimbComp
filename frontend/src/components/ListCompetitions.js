import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdGroups } from "react-icons/md";

function ListCompetitions(props) {
  const navigate = useNavigate();
  return (
    <div className="bg-bg-200 drop-shadow rounded-lg mt-2 p-2 px-4">
      <div className="flex mt-1">
        <div className="w-1/2 text-light font-semibold px-2">Name</div>
        <div className="w-1/2 px-2">
          <MdGroups size={24} className="text-text-100 float-right" />
        </div>
      </div>
      {props.competitions &&
        props.competitions.map((competition, index) => (
          <div
            key={index}
            className="flex my-4 py-2 hover:bg-primary-200 border-l-4 border-accent-200 bg-primary-100 drop-shadow rounded-r-lg"
            onClick={() => navigate(`/competition/?id=${competition.id}`)}
          >
            <div key={index} className="w-1/2 text-light px-2 font-semibold">
              {competition.name}({competition.id})
            </div>
            <div className="w-1/2 text-light text-right px-4">
              {competition.competitors.length}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListCompetitions;
