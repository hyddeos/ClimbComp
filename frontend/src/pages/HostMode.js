import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Competitions from "../components/Competitions";
import Challenges from "../components/Challenges";
import Login from "../components/Login";

import { API_URL } from "../constants";

function HostMode() {
  const [challenges, setChallenges] = useState(null);
  const [competitions, setCompetitions] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = React.useState(false); // CHANGE userLoggedIn to token later ----------

  function Logout() {
    console.log("logging user out");
    setUserLoggedIn(false);
  }

  useEffect(() => {
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
  }, []);
  console.log("comp", competitions);

  return (
    <>
      <PageTitle title="Host Mode" info="Create and Update" />
      <button className="bg-light" onClick={() => Logout()}>
        log out
      </button>
      {userLoggedIn ? (
        <>
          <Competitions competitions={competitions} />
          <Challenges challenges={challenges} />
        </>
      ) : (
        <Login setUserLoggedIn={setUserLoggedIn} />
      )}
    </>
  );
}

export default HostMode;
