import React from "react";
import PageTitle from "../components/PageTitle";
import Competitions from "../components/Competitions";
import Challenges from "../components/Challenges";
import Login from "../components/Login";

function HostMode() {
  // CHANGE userLoggedIn to token later ----------
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  // CHANGE userLoggedIn to token later ----------
  function Logout() {
    console.log("logging user out");
    setUserLoggedIn(false);
  }

  return (
    <>
      <PageTitle title="Host Mode" info="Create and Update" />
      <button className="bg-light" onClick={() => Logout()}>
        log out
      </button>
      {userLoggedIn ? (
        <>
          <div className="flex justify-evenly">
            <button className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg">
              New Challange
            </button>
          </div>
          <Challenges />
        </>
      ) : (
        <Login setUserLoggedIn={setUserLoggedIn} />
      )}
    </>
  );
}

export default HostMode;
