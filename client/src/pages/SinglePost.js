import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POST, QUERY_POSTS } from "../utils/queries";
import { DELETE_POST } from "../utils/mutations";
import Auth from "../utils/auth";

import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";

const SinglePost = () => {
  const { id: postId } = useParams();

  const { loading, data, } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });

  const post = data?.post || {};

 // console.log(postId);

  const [deletePost, {error}] = useMutation(DELETE_POST, {
    update(cache, { data: { deletePost } }) {

      const { posts } = cache.readQuery({ query: QUERY_POSTS });

      const updatedPosts = posts.filter((post) => post._id !== deletePost._id);
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: updatedPosts },
      });
    },

    
  });

  const handleDeletePost = async () => {
    try {
      await deletePost({ variables: { postId: post._id } });
      console.log(deletePost)
      
    } catch (err) {
      console.error(err);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

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
      <main className="grid grid-cols-1 w-full">
        <div className="m-4 font-bold hover:text-[#40c3c2] hover:underline text-lg">
          <Link to="/">
            <h4> ← Return Home</h4>
          </Link>
        </div>

        <div className="max-w-[400px] sm:max-w-[600px] lg:max-w-[800px] w-full mx-auto py-6">
          {/* title div */}
          <div className="flex flex-col justify-center items-center">
            {/* post category */}
            <p className="rounded-lg py-1 px-2.5 bg-gradient-to-r from-[#40c3c2] to-[#0081a7] text-sm text-black mb-8 border border-black">
              #{post.category}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              {post.createdAt.split(" at")[0]}
            </p>
            <h2 className="text-5xl font-semibold text-center mb-4">{post.postTitle}</h2>
            <p className=" text-black font-extrabold capitalize hover:text-[#40c3c2]">
                <Link to={`/profile/${post.username}`}>{post.username}</Link>
              
            </p>
          </div>

          {/* post content */}
          <div className=" overflow-hidden">
            <div className="p-6">
              <p className="text-lg whitespace-pre-wrap">{post.postText}</p>
            </div>
          </div>



          {/* Delete post button */}
          {Auth.loggedIn() && Auth.getProfile().data.username === post.username && (
            <div className="flex justify-end mt-4">
              <button
                className="flex items-center text-[#40c3c2] hover:underline"
                onClick={handleDeletePost}
              >
                
                Delete Post
              </button>
            </div>
          )}




        </div>


        




        <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] w-full mx-auto py-6">
          <div className="">
            {Auth.loggedIn() ? (
              <CommentForm postId={post._id} />
            ) : (
              <div className="flex justify-center">
                <p className="text-lg">
                  <span className="text-[#0081a7] underline">
                    <Link to="/login">Log in</Link>
                  </span>{" "}
                  to leave a comment
                </p>
              </div>
            )}
          </div>
          <div className="">
            <CommentList comments={post.comments} />
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default SinglePost;
