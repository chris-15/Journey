import React, { useState } from "react";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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


  // settings for the framer motion div to transition to the page 
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      <main className="grid grid-cols-1 h-screen w-full">
        <div className="flex flex-col justify-center">
          <form
            className="max-w-[300px] sm:max-w-[400px] w-full mx-auto"
            onSubmit={handleFormSubmit}
          >
            <h2 className="text-4xl font-bold text-center py-6">Cancer Blog</h2>

            <div className="flex flex-col py-2">
              {/* <label className="" htmlFor="email">Email</label> */}
              <input
                className="border-2 p-2 focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
                id="email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="flex flex-col py-2">
              {/* <label className="" htmlFor="password">Password</label> */}
              <input
                className="border-2 p-2 focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
                id="password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-xl text-[#FF0022] font-extrabold"
              >
                Incorrect credentials
              </motion.div>
            )}

            <div>
              <button
                className=" rounded-md w-full my-5 py-2 bg-[#FF0022] text-white hover:underline font-semibold hover:bg-red-700 transition duration-300 ease-in-out"
                type="submit"
              >
                Log In
              </button>
            </div>

            <div className="flex justify-around">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-[#FF0022] hover:underline"
                >
                  Sign up!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </main>
    </motion.div>
  );
};

export default Login;
