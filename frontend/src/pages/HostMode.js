import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import Competitions from "../components/Competitions";
import Challenges from "../components/Challenges";
import Login from "../components/Login";

import { API_URL } from "../constants";

function HostMode() {
  const [challenges, setChallenges] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = React.useState(false); // CHANGE userLoggedIn to token later ----------

  function Logout() {
    console.log("logging user out");
    setUserLoggedIn(false);
  }

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

  return (
    <>
      <PageTitle title="Host Mode" info="Create and Update" />
      <button className="bg-light" onClick={() => Logout()}>
        log out
      </button>
      {userLoggedIn ? (
        <>
          <Competitions challenges={challenges} />
          <Challenges challenges={challenges} />
        </>
      ) : (
        <Login setUserLoggedIn={setUserLoggedIn} />
      )}
    </>
  );
}

export default HostMode;
