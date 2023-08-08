import React from "react";
import { API_URL } from "../constants";

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password,
    };

    try {
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userData }),
      });

      if (response.ok) {
        // Registration successful, handle accordingly
        console("Succes");
      } else {
        // Registration failed, handle accordingly
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="bg-light">
      <h1 className="text-light">This is Register</h1>
      <a className="text-acc-600" href="/hostmode">
        HOSTMODE LINK
      </a>
      <h1 className="">This is Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Mail:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
