import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";

import CommentList from "../components/CommentList";
import CommentForm  from "../components/CommentForm";

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
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] w-full mx-auto py-6">
        <h2 className="text-2xl text-center">{post.postTitle}</h2>

        <div className="border-2 border-solid border-black p-2 my-2">
          <p>
            {post.username} on {post.createdAt}
          </p>
          <p className="">{post.postText}</p>
        </div>
      </div>
      <div className="">
      <CommentList comments={post.comments}/>
      </div>
      <div>
        <CommentForm postId={post._id}/>
      </div>
    </main>
  );
};

export default SinglePost;
