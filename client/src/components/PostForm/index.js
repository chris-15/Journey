import React, { useState } from "react";

const PostForm = () => {
  const [characterCount, setCharacterCount] = useState(0);

  return (
    <div>
      
        {/* <p className=" mb-2">Character Count:</p> */}

        <form className="max-w-md mx-auto bg-white shadow-md rounded-lg px-8 py-6 xl:max-w-2xl">
          {/* <h3 className="text-lg font-semibold mb-4">Title</h3> */}
          <h2 className="text-3xl font-bold text-center mb-4">Create A Post!</h2>
          <div className="mb-4">
            <textarea
              className="w-full border-2 border-gray-300 p-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
              placeholder="Add a Title"
            ></textarea>
          </div>
          <div className="mb-4">
            <textarea
              className="w-full border-2 border-gray-300 p-2 rounded-lg resize-none h-40 lg:h-80 focus:outline-none focus:ring-2 focus:ring-[#FF0022]"
              placeholder="Write Something!"
            ></textarea>
          </div>
          <button
            className="w-full py-2 px-4 bg-[#FF0022] text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
            type="submit"
          >
            Add Post
          </button>
        </form>
      
    </div>
  );
};

export default PostForm;
