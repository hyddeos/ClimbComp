import React, { useEffect, useState } from "react";
import CreateNewCompetition from "./CreateNewChallenge";

import { API_URL } from "../constants";

function ListChallenge(props) {
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/api/challenge`); // Replace with your API endpoint URL
        if (response.ok) {
          const jsonData = await response.json();
          setChallenges(jsonData);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);
  console.log(challenges);

  return (
    <div className="border border-nightsky-900">
      <div className="flex mt-1">
        <div className="w-1/2 text-light font-semibold px-2">Name</div>
        <div className="w-1/2 text-light text-right font-semibold px-2">
          Problems
        </div>
      </div>
      {challenges &&
        challenges.map((challenge, index) => (
          <div className="flex my-2">
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
