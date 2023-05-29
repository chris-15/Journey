import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = ({ postId }) => {
  const [commentText, setCommentText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);
  const [addComment, { error }] = useMutation(ADD_COMMENT);

  // function to handle any change from input
  const handleChange = (event) => {
    if (event.target.value.length <= 500) {
      setCommentText(event.target.value);
      setCharacterCount(event.target.value.length);
      console.log(commentText);
    }
  };

  // function to handle form submit
  const handleFormSubmit = async (event) => {
    try {
      await addComment({
        variables: { commentText, postId },
      });
      // this clears the form value
      setCommentText("");
      setCharacterCount(0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-[600px] w-full mx-auto">
      <p className=" mb-2">
        Character Count: {characterCount}/500
        {error && <span>Something went wrong!</span>}
      </p>

      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center mb-4">
          <textarea
            className="flex-grow border-2 p-2 mr-2 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
            placeholder="Add a comment..."
            value={commentText}
            onChange={handleChange}
          ></textarea>
          <button
            className="px-4 py-2 bg-[#FF0022] text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
