import React from "react";

import { API_URL } from "../constants";

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
        if (data.status === "succes") {
          props.setUserLoggedIn(true);
          console.log("data", data);
        }
      } else {
        console.log("--login failed--");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="bg-nightsky-950 p-6 m-6 rounded-lg">
      <h3 className="text-center font-header font-extrabold text-2xl text-light ">
        Login
      </h3>
      <h5 className="font-body text-light text-center mx-8">
        Just a quick login or get back to the{" "}
        <a className="text-acc-600 hover:text-acc-400 underline" href="/">
          Start Page
        </a>
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <div className="w-3/4 block m-auto">
            <label className="text-light p-1" htmlFor="email">
              Email:
            </label>
          </div>
          <input
            className="rounded-lg block m-auto py-1 px-2 w-3/4"
            placeholder="Your email"
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <div className="w-3/4 block m-auto mt-4">
            <label className="text-light" htmlFor="password">
              Password:
            </label>
          </div>
          <input
            className="rounded-lg block m-auto py-1 px-2 w-3/4"
            placeholder="Your password"
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="flex justify-center my-8 border-light">
          <button className="bg-acc-600 hover:bg-acc-400 text-light font-body font-bold w-28 h-20 p-3 rounded-lg ">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
