import React from "react";

import climber2 from "../assets/climber2.svg";

function PageTitle(props) {
  return (
    <div className="w-full m-auto relative">
      <img
        className="absolute h-24"
        src={climber2}
        alt="a climber climbing an overhang"
      />
      <h2 className=" text-center font-header font-extrabold text-text-100 text-2xl p-3 rounded-b-lg">
        {props.title}
      </h2>
    </div>
  );
}

export default PageTitle;
