import React, { useState } from "react";
import { ADD_POST } from "../../utils/mutations";
import { QUERY_POSTS, QUERY_ME } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { motion } from "framer-motion";

const PostForm = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const [postText, setPostText] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const [addPost, { error }] = useMutation(ADD_POST, {
    update(cache, { data: { addPost } }) {
      try {
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, posts: [...me.posts, addPost] } },
        });
      } catch (e) {
        console.warn("error");
      }

      const { posts } = cache.readQuery({ query: QUERY_POSTS });
      cache.writeQuery({
        query: QUERY_POSTS,
        data: { posts: [addPost, ...posts] },
      });
    },
  });

  // function to handle the character count to show the user how many characters their post is and to show the limit
  const handlePostChange = (event) => {
    if (event.target.value.length <= 5000) {
      setPostText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addPost({
        variables: { postText, postTitle },
      });

      // clear the values in the form
      setPostText("");
      setPostTitle("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="mx-4">
      <form
        className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 py-6 lg:max-w-2xl"
        onSubmit={handleFormSubmit}
      >
        {/* <h3 className="text-lg font-semibold mb-4">Title</h3> */}
        <h2 className="text-3xl font-bold text-center mb-4">Create A Post!</h2>
        <div className="mb-4">
          <textarea
            className="w-full border-2 border-gray-300 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#40c3c2]"
            placeholder="Add a Title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          ></textarea>
        </div>
        <div className="">
          <textarea
            className="w-full border-2 border-gray-300 p-2 rounded-lg resize-none h-40 lg:h-80 focus:outline-none focus:ring-2 focus:ring-[#40c3c2]"
            placeholder="Write Something!"
            value={postText}
            onChange={handlePostChange}
          ></textarea>
        </div>
        <p className="mb-4 text-center">
          Character Limit: {characterCount}/5000
        </p>
        
          {error && (
            <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-center text-xl text-[#FF0022] font-extrabold my-4"
          >
            <p>
              Something went wrong! Try again!
            </p>
            </motion.div>
          )}
        

        <button
          className="w-full py-2 px-4 font-semibold rounded-md text-white bg-[#0081a7] hover:underline hover:bg-gradient-to-r from-[#0081a7] to-[#40c3c2]"
          type="submit"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
