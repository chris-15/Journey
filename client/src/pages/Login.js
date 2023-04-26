import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

import React, { useState } from "react";

const Login = () => {
  const [login, { error }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({ email: "", password: "" });

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
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (event) {
      console.error(event);
    }

    //clears the form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="grid grid-cols-1 h-screen w-full">
      <div className="flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto" onSubmit={handleFormSubmit}>
          <h2 className="text-4xl font-bold text-center py-6">Cancer Blog</h2>

          <div className="flex flex-col py-2">
            <label className="" htmlFor="email">Email</label>
            <input
              className="border-2 p-2"
              id="email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col py-2">
            <label className="" htmlFor="password">Password</label>
            <input
              className="border-2 p-2"
              id="password"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
            />
          </div>

          <div>
            <button className="border w-full my-5 py-2 bg-[#FF0022] text-white hover:underline" type="submit">
              Log In
            </button>
          </div>

          <div className="flex justify-around">
            <p>Not a member?</p>
            <p className="font-bold hover:underline">Sign up now!</p>
          </div>
        </form>

        {error && <div>Incorrect credentials</div>}
      </div>
    </main>
  );
};

export default Login;
