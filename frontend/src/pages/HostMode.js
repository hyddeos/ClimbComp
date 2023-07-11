import React from "react";
import PageTitle from "../components/PageTitle";
import ListCompetitions from "../components/ListCompetitions";
import Login from "../components/Login";

const loggedin = false;

function HostMode() {
  return (
    <>
      <PageTitle title="Host Mode" info="Create and Update" />
      {loggedin ? (
        <>
          <div className="flex justify-evenly">
            <button className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg">
              New Competition
            </button>
            <button className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg">
              New Challange
            </button>
          </div>
          <ListCompetitions />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default HostMode;
