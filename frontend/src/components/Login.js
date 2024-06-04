import React from "react";

import { API_URL } from "../constants";

import climber3 from "../assets/climber3.svg";

function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      user: { email, password },
    };

    try {
      const response = await fetch(`${API_URL}/api/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("--login succesful-- ");
        const data = await response.json();
        if (data.token) {
          props.setUserToken(true);
          localStorage.setItem("authToken", data.token);
          window.location.reload();
        }
      } else {
        console.log("--login failed--");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className=" p-6 m-6 rounded-lg relative overflow-hidden z-10">
      <img
        className="absolute top-0 right-0 w-60 -mt-1 z-0"
        src={climber3}
        alt="a climber climbing an overhang"
      />
      <h3 className="text-center relative font-header  font-extrabold text-3xl text-accent-200 drop-shadow z-[10]">
        ClimbComp
      </h3>
      <h4 className="text-center relative font-header font-extrabold text-xl text-accent-200 drop-shadow mb-8 z-[10]">
        Host Mode
      </h4>

      <h2 className="text-center relative font-header font-extrabold text-4xl text-text-100 mb-3 z-[10]">
        Log In
      </h2>
      <h5 className="font-body text-body text-text-200 text-center mx-8 relative">
        Just a quick login before you can start hosting your{" "}
        <span className="font-semibold text-text-100">
          awesome competitions!
        </span>{" "}
      </h5>
      <form className="relative" onSubmit={handleSubmit}>
        <div className="mt-4">
          <div className="w-3/4 block m-auto text-text-100 font-semibold relative">
            <label className="text-light p-1 relative" htmlFor="email">
              Email:
            </label>
          </div>
          <input
            className="rounded-lg block m-auto py-1 px-2 w-3/4 border border-text-200 relative"
            placeholder="Your email"
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <div className="w-3/4 block m-auto mt-4 text-text-100 font-semibold relative">
            <label className="text-light" htmlFor="password">
              Password:
            </label>
          </div>
          <input
            className="rounded-lg block m-auto py-1 px-2 w-3/4 border border-text-200"
            placeholder="Your password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex justify-center my-8 border-light relative">
          <button className="bg-primary-100 hover:bg-primary-200 text-text-100 font-body font-bold w-3/4 h-16 p-3 rounded-lg ">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
