import React, { useEffect, useState } from "react";
import CreateNewCompetition from "./CreateNewChallenge";

import { API_URL } from "../constants";

function ListCompetitions(props) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/api/....`); // Replace with your API endpoint URL
        if (response.ok) {
          const jsonData = await response.json();
          setData(jsonData);
          console.log("OK!", jsonData);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);
  return (
    <div className="border border-nightsky-900 flex mt-2">
      <div className="w-1/2 text-light font-semibold px-2">Name</div>
      <div className="w-1/2 text-light font-semibold px-2">Challange</div>
      <div className="w-1/2 text-light font-semibold px-2">Competitors</div>
      <div className="w-1/8 text-light font-semibold px-2">Live</div>
    </div>
  );
}

export default ListCompetitions;
