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
      console.log(commentText)
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
    <div>
        <p>
            Character Count: {characterCount}/500
            {error && <span>Something went wrong!</span>}
        </p>
      <form onSubmit={handleFormSubmit}>
        <div>
          <textarea
            placeholder="Add a comment..."
            value={commentText}
            onChange={handleChange}
          ></textarea>
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
