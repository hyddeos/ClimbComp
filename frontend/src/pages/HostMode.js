import React, { useState, useEffect } from "react";
import Competitions from "../components/Competitions";
import Challenges from "../components/Challenges";
import Login from "../components/Login";

import { MdLogout } from "react-icons/md";
import { API_URL } from "../constants";
import PageTitle from "../components/PageTitle";

function HostMode() {
  const [challenges, setChallenges] = useState(null);
  const [competitions, setCompetitions] = useState(null);
  const [userToken, setUserToken] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setUserToken(true);

      async function fetchData() {
        try {
          const challengeResponse = await fetch(`${API_URL}/api/challenge`);
          const competitionResponse = await fetch(`${API_URL}/api/competition`);
          if (challengeResponse.ok && competitionResponse.ok) {
            const challengeJsonData = await challengeResponse.json();
            const competitionJsonData = await competitionResponse.json();
            setChallenges(challengeJsonData);
            setCompetitions(competitionJsonData);
          } else {
            console.error(
              "Challenge Request failed with status:",
              challengeResponse.status
            );
            console.error(
              "Competition Request failed with status:",
              competitionResponse.status
            );
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
      fetchData();
    }
  }, []);

  function Logout() {
    console.log("logging out User");
    localStorage.removeItem("authToken");
    setUserToken("");
  }

  return (
    <>
      {userToken ? (
        <>
          <PageTitle title="ClimbComp - Host mode" />
          <button
            className="absolute rounded-lg text-xs m-4 mr-5 bg-bg-200 hover:bg-primary-200 top-0 right-1 p-1 font-semibold 
        drop-shadow"
            onClick={() => Logout()}
          >
            <MdLogout size={24} className="text-text-100" />
          </button>
          <Competitions
            competitions={competitions}
            challenges={challenges}
            userToken={userToken}
          />
          <Challenges challenges={challenges} userToken={userToken} />
        </>
      ) : (
        <Login setUserToken={setUserToken} />
      )}
    </>
  );
}

export default HostMode;
