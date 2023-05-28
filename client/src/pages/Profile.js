import React, { useState } from "react";
import { Link } from "react-router-dom";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

import { useQuery } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  console.log("HELLO " + userParam);

  const user = data?.me || data?.user || {};

  console.log(user.posts);

  // set state of the post form
  const [showPostForm, setShowPostForm] = useState(false);

  // function to handle toggling the show post form button
  const handleTogglePostForm = () => setShowPostForm(!showPostForm);

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />;
  }

  if (!user?.username) {
    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <h4 className="text-2xl text-center">
          You need to be logged in to use this page.
        </h4>
        <h4 className="mt-4 text-xl font-extrabold">
          <Link to="/login" className="text-[#FF0022] hover:underline">
            Log In Here!
          </Link>
        </h4>
      </main>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="mx-4 mt-4 mb-6 font-bold hover:text-[#FF0022] text-lg">
        <Link to="/">
          <h4> ← Return Home</h4>
        </Link>
      </div>
      {/* <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          { userParam ?  `${user.username}'s` : 'Your'} Profile
        </h2>
      </div> */}


      {/* condititonaly render add post form if user logged in or not */}
      {/* and conditionally render post form with a button so if user doesnt want to add a post they can hide the form so it doesnt take up space on the screen */}
      <div>
        {!userParam && (
          <div className="">
            <div className="max-w-xs mx-auto">
              <button
                className=" w-full max-w-xl py-2 px-4 mb-4 bg-[#FF0022] text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
                type="button"
                onClick={handleTogglePostForm}
              >
                {showPostForm ? "Hide" : "Add Post!"}
              </button>
            </div>
            <div>{showPostForm && <PostForm />}</div>
          </div>
        )}
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PostList
            posts={user.posts}
            title={userParam ? `${user.username}'s Posts` : "Your Posts"}
          />
        </div>
      </div>
    </main>
  );
};

export default Profile;
