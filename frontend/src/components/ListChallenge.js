import React from "react";

function ListChallenge(props) {
  return (
    <div className="border border-nightsky-900 mt-2">
      <div className="flex mt-1">
        <div className="w-1/2 text-light font-semibold px-2">Name</div>
        <div className="w-1/2 text-light text-right font-semibold px-2">
          Problems
        </div>
      </div>
      {props.challenges &&
        props.challenges.map((challenge, index) => (
          <div key={index} className="flex my-2">
            <div key={index} className="w-1/2 text-light px-2">
              {challenge.name}
            </div>
            <div className="w-1/2 text-light text-right px-2">
              {challenge.problems.length}
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListChallenge;
