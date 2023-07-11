import React from "react";
import PageTitle from "../components/PageTitle";
import Timer from "../components/Timer";

function Home() {
  return (
    <div>
      <PageTitle title="ClimbComp" info="Your Climb Competition companion" />
      <a className="text-acc-600" href="/hostmode">
        HOSTMODE LINK
      </a>
      <br></br>
      <a className="text-acc-600" href="/register">
        REGISTER
      </a>
      <h1 className="">This is Home</h1>
      <Timer />
    </div>
  );
}

export default Home;
