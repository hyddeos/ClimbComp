import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Competitions from "../components/Competitions";
import Challenges from "../components/Challenges";
import Login from "../components/Login";

import { API_URL } from "../constants";

function HostMode() {
  const [challenges, setChallenges] = useState(null);
  const [competitions, setCompetitions] = useState(null);
  const [userToken, setUserToken] = React.useState(false);

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
  console.log("COMP:", competitions, "CHALL", challenges, "Token", userToken);

  return (
    <>
      <PageTitle title="Host Mode" info="Create and Update" />
      <button className="bg-light" onClick={() => Logout()}>
        log out
      </button>
      {userToken ? (
        <>
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
