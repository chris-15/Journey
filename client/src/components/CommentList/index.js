import React from "react";

const CommentList = ({ comments }) => {
  return (
    <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] w-full mx-auto py-6">
      <div className="mb-4">
        <h4 className="text-2xl font-semibold">Comments</h4>
      </div>
      <div>
        {comments &&
          comments.map((comment) => (
            <div className="mb-4 bg-white shadow-lg rounded-lg p-4" key={comment._id}>
               <p className="mb-1 text-lg">{comment.commentText}</p>

              <p className="text-sm ">
                {comment.username} on {comment.createdAt}
              </p>
              
            </div>
          ))}
      </div>
    </div>
  );
};

export default CommentList;
