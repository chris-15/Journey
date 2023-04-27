import React from "react";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_POST } from "../utils/queries";

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
    <main className="">
        <div>
            <p>{post.username} on {post.createdAt}</p>
        </div>
        <div>
            <p>{post.postText}</p>
        </div>
    </main>
  )
};

export default SinglePost;
