import React from "react";
import PageTitle from "../components/PageTitle";

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
    </div>
  );
}

export default Home;
