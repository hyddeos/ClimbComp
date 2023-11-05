import React from "react";
import { useNavigate } from "react-router-dom";

import { MdArrowBack } from "react-icons/md";

function CompletedCompetitionView(props) {
  const navigate = useNavigate();

  const sortedScore = [...props.scoredata].sort((a, b) => {
    if (b.score === a.score) {
      // If scores are equal, compare attempts
      return a.attempts - b.attempts;
    }
    // Otherwise, compare scores
    return b.score - a.score;
  });

  return (
    <>
      <button
        className="absolute rounded-lg text-xs m-4 mr-5 bg-bg-200 hover:bg-primary-200 top-0 left-1 p-1 font-semibold 
        drop-shadow"
        onClick={() => navigate(-1)}
      >
        <MdArrowBack size={32} className="text-text-100" />
      </button>
      <div
        className="relative m-auto mt-20 z-50 w-5/6 py-2 pb-5 bg-bg-200 drop-shadow-xl rounded-xl
border border-text-200"
      >
        <h3 className="font-header text-text-100 text-center text-2xl my-4">
          Final Standings
        </h3>
        <div className="p-3">
          <table className="w-full">
            <thead className="">
              <tr>
                <th className="text-left">Rank</th>
                <th className="text-left">Competitor</th>
                <th className="text-left">Probs</th>
                <th className="text-left">Trys</th>
                <th className="text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedScore.map((item, index) => (
                <tr key={index} className="text-left">
                  <td className="text-left pl-4">{index + 1}</td>
                  <td>{item.competitor}</td>
                  <td className="text-left pr-6">{item.problems}</td>
                  <td className="text-left pr-6">{item.attempts}</td>
                  <td className="text-left pr-4">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default CompletedCompetitionView;
