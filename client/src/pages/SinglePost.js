import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";
import Auth from "../utils/auth";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });

  const post = data?.post || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="grid grid-cols-1 w-full">
      <div className="m-4 font-bold hover:text-[#FF0022] hover:underline text-lg">
        <Link to="/">
          <h4> ← Return Home</h4>
        </Link>
      </div>
      <div className="max-w-[400px] sm:max-w-[600px] lg:max-w-[800px] w-full mx-auto py-6">
        <h2 className="text-4xl font-semibold text-center mb-4">{post.postTitle}</h2>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6">
            <p className="mb-2">
              <span className="text-black font-extrabold hover:text-[#FF0022]"><Link to={`/profile/${post.username}`}>{post.username}</Link></span> on {post.createdAt}
            </p>
            <p className="text-lg">{post.postText}</p>
          </div>
        </div>
      </div>
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] w-full mx-auto py-6">
        <div className="">
          {Auth.loggedIn() ? (
            <CommentForm postId={post._id} />
          ) : (
            <div className="flex justify-center">
              <p className="text-lg"><span className="text-[#FF0022] hover:underline"><Link to="/login">Log in</Link></span> to leave a comment</p>
              </div>
          )}
        </div>
        <div className="">
          <CommentList comments={post.comments} />
        </div>
      </div>
    </main>
  );
};

export default SinglePost;
