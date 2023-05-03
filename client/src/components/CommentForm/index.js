import React, { useState } from "react";

import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

const CommentForm = ({ postId }) => {
  return (

    <div>
      <form>
        <div>
          <textarea placeholder="Add a comment..."></textarea>
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
