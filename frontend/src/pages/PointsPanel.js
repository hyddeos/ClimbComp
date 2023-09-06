import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

function PointsPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [competitionState, setCompetitionState] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const compId = searchParams.get("id");
  console.log("compid", compId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/result/${compId}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        setCompetitionState(responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => navigate(-1)}>BACK</button>
      <h1 className="text-center font-bold m-2">Competition Title</h1>
      <h3 className="mx-4">
        Competitor: <span className="font-bold text-right">XXX</span>
      </h3>
      <h3 className="mx-4 mb-2">
        Problem: <span className="font-bold">Y/Z</span>
      </h3>
      <Timer timelimit="24000" />
      <div className="bg-nightsky-950 py-2 my-1">
        <h3 className="text-light text-center">Attempt-Counter</h3>
        <div className="flex justify-evenly my-4">
          {" "}
          <button className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-16 h-16 p-3 rounded-full">
            +
          </button>
          <p className="text-center text-6xl text-light">1</p>
          <button className="bg-acc-800 hover:bg-acc-400 text-light font-body font-bold w-16 h-16 p-3 rounded-full">
            -
          </button>
        </div>
        <div className="flex justify-evenly my-8">
          {" "}
          <button className="bg-acc-800 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg">
            Top
          </button>
          <button className="bg-acc-800 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg">
            Zone
          </button>
        </div>
        <div className="mx-6">
          {" "}
          <button className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-full h-20 p-3 rounded-lg">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PointsPanel;
