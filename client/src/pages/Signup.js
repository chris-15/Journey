import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser, { error }] = useMutation(ADD_USER);

  // on change function anytime input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (event) {
      console.error(event);
    }
  };

  return (
    <main className="grid grid-cols-1 h-screen w-full">
      <div className="flex flex-col justify-center">
        <form
          className=" max-w-[300px] sm:max-w-[400px]  w-full mx-auto"
          onSubmit={handleFormSubmit}
        >
          <h2 className="text-4xl font-bold text-center py-6">
            Create Your Account
          </h2>
          {/* username */}
          <div className="flex flex-col py-2">
            <label htmlFor="username">Username</label>
            <input
              className="border-2 p-2"
              id="username"
              type="username"
              name="username"
              value={formState.username}
              onChange={handleChange}
            />
          </div>

          {/* email */}
          <div className="flex flex-col py-2">
            <label htmlFor="email">Email</label>
            <input
              className="border-2 p-2"
              id="email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>

          {/* password */}
          <div className="flex flex-col py-2">
            <label htmlFor="password">Password</label>
            <input
              className="border-2 p-2"
              id="password"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>

          {error && <div className="text-center text-xl text-[#FF0022] font-extrabold">Something went wrong. Please try again!</div>}

          <div>
            <button className="rounded-md w-full my-5 py-2 bg-[#FF0022] text-white hover:underline font-semibold hover:bg-red-700 transition duration-300 ease-in-out" type="submit">CREATE ACCOUNT</button>
          </div>

          <div className="flex justify-around">
            <p>Already have an account? <Link to="/login" className="font-bold hover:text-[#FF0022] hover:underline">LOG IN</Link></p>
          </div>
        </form>
        
      </div>
    </main>
  );
};

export default Signup;
