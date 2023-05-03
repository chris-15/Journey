import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div>
      <div>
        <h4>Comments</h4>
      </div>
      <div>
        {comments &&
          comments.map((comment) => (
            <div>
              <p>
                {comment.username} on {comment.createdAt}
              </p>
              <p key={comment._id}>{comment.commmentText}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
