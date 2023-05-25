import React from "react";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

import { useQuery,  } from "@apollo/client";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Navigate, useParams } from "react-router-dom";

const Profile = () => {
  const { username: userParam } = useParams();
  const { loading, data } = useQuery( userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  }
  );

  console.log("HELLO " + userParam)

  const user = data?.me  || data?.user || {};

  console.log(user)

  if( Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
   return <Navigate to="/profile" />
  }  
  

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the links up top to sign
        up or log in.
      </h4>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return  (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          { userParam ?  `${user.username}'s` : 'Your'} Profile
        </h2>
      </div>

      <div>
        <PostForm />
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <PostList posts={user.posts} title={
            userParam ? `${user.username}'s Posts` : "Your Posts"} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
