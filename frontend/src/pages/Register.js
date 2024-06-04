import React from "react";
import { API_URL } from "../constants";
import { Navigate, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rePassword, setRePassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== rePassword) {
      return setErrorMsg("Passwords dont match");
    }

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
        setErrorMsg("Registration done...You will be redirected");
        navigate("/");
      } else {
        // Registration failed, handle accordingly
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div className="bg-bg-100 m-4">
      <div className="container mx-auto py-8 bg-bg-200">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registration Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
        >
          {errorMsg && <p className="text-xl text-red-300 pb-4">{errorMsg}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Mail
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="text"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              type="password"
              id="repassword"
              value={rePassword}
              onChange={(event) => setRePassword(event.target.value)}
            />
          </div>
          <button
            className="bg-primary-100 hover:bg-primary-200 text-text-100 font-body font-bold h-16 p-3 rounded-lg w-full"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
