import React from "react";

function Scoreboard(props) {
  const sortedScore = [...props.scoredata].sort((a, b) => {
    if (b.score === a.score) {
      // If scores are equal, compare attempts
      return a.attempts - b.attempts;
    }
    // Otherwise, compare scores
    return b.score - a.score;
  });

  return (
    <div
      className="z-50 w-5/6 py-2 pb-5 bg-bg-200 drop-shadow-xl backdrop-blur-sm absolute top-1/2 left-1/2 
    transform -translate-x-1/2 -translate-y-1/2 rounded-xl
    border border-text-200"
    >
      <button
        onClick={() => props.showScoreboard(false)}
        className="absolute top-2 right-2 font-bold text-light w-8 h-8 bg-bg-300 hover:bg-acc-400 rounded-full"
      >
        X
      </button>
      <h3 className="font-header text-text-100 text-center my-4">
        Current Standings
      </h3>
      <div className="p-3">
        <table className="w-full">
          <thead className="">
            <tr>
              <th className="text-left">Rank</th>
              <th className="text-left">Competitor</th>
              <th className="text-right">Probs</th>
              <th className="text-right">Trys</th>
              <th className="text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {sortedScore.map((item, index) => (
              <tr key={index} className="text-left">
                <td className="text-left pl-4">{index + 1}</td>
                <td>{item.competitor}</td>
                <td className="text-center pr-6">{item.problems}</td>
                <td className="text-center pr-6">{item.attempts}</td>
                <td className="text-center pr-4">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Scoreboard;
