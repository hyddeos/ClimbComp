import React from "react";

import { MdQuiz } from "react-icons/md";

function ListChallenge(props) {
  return (
    <div className="bg-bg-200 drop-shadow rounded-lg mt-2 p-2 px-4">
      <div className="flex mt-1">
        <div className="w-1/2 text-light font-semibold px-2">Name</div>
        <div className="w-1/2 px-2">
          <MdQuiz size={24} className="text-text-100 float-right" />
        </div>
      </div>
      {props.challenges &&
        props.challenges.map((challenge, index) => (
          <div
            key={index}
            className="flex my-4 py-2 hover:bg-primary-200 border-l-4 border-accent-200 bg-primary-100 drop-shadow rounded-r-lg"
          >
            <div key={index} className="w-1/2 text-light px-2 font-semibold">
              {challenge.name}({challenge.id})
            </div>
            <div className="w-1/2 text-light text-right px-4">
              {challenge.problems.length}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListChallenge;
