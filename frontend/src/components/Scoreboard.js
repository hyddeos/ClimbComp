import React from "react";

function Scoreboard(props) {
  const sortedScore = [...props.scoredata].sort((a, b) => b.score - a.score);

  return (
    <div
      className="w-5/6 py-2 pb-5 bg-daysky-100 absolute top-1/2 left-1/2 
    transform -translate-x-1/2 -translate-y-1/2 rounded-xl
    border-4 border-acc-500"
    >
      <button
        onClick={() => props.showScoreboard(false)}
        className="absolute top-2 right-2 font-bold text-light w-8 h-8 bg-acc-800 hover:bg-acc-400 rounded-full"
      >
        X
      </button>
      <h3 className="font-header text-center my-4">Current Standings</h3>
      <div className="p-3">
        <table className="w-full">
          <thead className="">
            <tr>
              <th>Place</th>
              <th>Competitor</th>
              <th>Problems</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedScore.map((item, index) => (
              <tr key={index} className="text-left">
                <td>{index + 1}</td>
                <td>{item.competitor}</td>
                <td>{item.problems}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scoreboard;
