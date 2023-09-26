import React from "react";

function ProblemInfo(props) {
  function secToMin(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes === 0) {
      return `${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
    } else if (remainingSeconds === 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else {
      return `${minutes} minute${
        minutes !== 1 ? "s" : ""
      } ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
    }
  }

  return (
    <div
      className="z-50 w-5/6 py-2 pb-5 bg-bg-200 drop-shadow-xl backdrop-blur-sm absolute top-1/2 left-1/2 
    transform -translate-x-1/2 -translate-y-1/2 rounded-xl
    border border-text-200"
    >
      <button
        onClick={() => props.showProblem(false)}
        className="absolute top-2 right-2 font-bold text-light w-8 h-8 bg-bg-300 hover:bg-acc-400 rounded-full"
      >
        X
      </button>
      <h3 className="font-header text-text-100 text-center my-4">
        Problem Info
      </h3>
      <div className="p-3">
        <ul>
          <li className="flex flex-row my-2">
            <div className="text-left w-28 px-2 mr-2 font-bold">Name</div>
            <div className="truncate">{props.problemData.name}</div>
          </li>
          <li className="flex flex-row my-2">
            <div className="text-left w-28 px-2 mr-2 font-bold">Type</div>
            <div className="truncate">{props.problemData.type}</div>
          </li>
          <li className="flex flex-row my-2">
            <div className="text-left w-28 px-2 mr-2 font-bold">Grade</div>
            <div className="truncate">{props.problemData.grade}</div>
          </li>
          {props.problemData.position && (
            <li className="flex flex-row my-2">
              <div className="text-left w-28 px-2 mr-2 font-bold">Position</div>
              <div className="truncate">{props.problemData.position}</div>
            </li>
          )}
          <li className="flex flex-row my-2">
            <div className="text-left w-28 px-2 mr-2 font-bold">Top</div>
            <div className="truncate">{props.problemData.toppoints} points</div>
          </li>
          {props.problemData.zonepoints != 0 && (
            <li className="flex flex-row">
              <div className="text-left w-28 px-2 mr-2 font-bold">Zone</div>
              <div className="truncate">
                {props.problemData.zonepoints} points
              </div>
            </li>
          )}
          <li className="flex flex-row my-2">
            <div className="text-left w-28 px-2 mr-2 font-bold">Timelimit</div>
            <div className="overflow-">
              {secToMin(props.problemData.timelimit)}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ProblemInfo;
