import React from "react";
import { API_URL } from "../constants";

function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Registration successful, handle accordingly
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
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
