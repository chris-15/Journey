import React from "react";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  // reversing the comments array so the latest comments get displayed
  // slice creates a new array so the original comment array goes unchanged
  const reversedCommentsArr = comments.slice().reverse();

  return (
    <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] w-full mx-auto py-6">
      <div className="mb-4">
        <h4 className="text-2xl font-semibold">Comments</h4>
      </div>
      <div
        className={
          !reversedCommentsArr || reversedCommentsArr.length === 0
            ? ""
            : "bg-white rounded-lg p-4"
        }
      >
        {reversedCommentsArr &&
          reversedCommentsArr.map((comment) => (
            <div
              className="mb-4 pb-2 border-b-2 border-dotted"
              key={comment._id}
            >
              <p className="mb-1 text-lg">{comment.commentText}</p>

              <p className="text-sm">
                <span className="font-extrabold hover:text-[#FF0022]">
                  <Link to={`/profile/${comment.username}`}>
                    {comment.username}
                  </Link>
                </span>{" "}
                <span className="text-gray-600">{comment.createdAt}</span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
