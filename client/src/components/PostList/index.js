import { Link } from "react-router-dom";
import { FaComment } from "react-icons/fa";

const PostList = ({ posts, title }) => {
  if (!posts || !posts.length) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h3 className="text-5xl font-bold mt-12">No Posts Yet</h3>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {posts &&
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white border-solid border-2 rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="pt-6 px-6">
                  <h3 className="text-2xl font-semibold mb-4 hover:text-[#40c3c2] hover:underline">
                    <Link to={`/post/${post._id}`}>{post.postTitle}</Link>
                  </h3>

                  <p className="mb-4 text-gray-500 line-clamp-2">
                    {post.postText}
                  </p>

                  <div className="flex items-center text-sm text-gray-600">
                    <p className="mr-2">
                      <span className="text-black font-extrabold hover:text-[#40c3c2]">
                        <Link to={`/profile/${post.username}`}>
                          {post.username}
                        </Link>
                      </span>{" "}
                      posted on {post.createdAt}
                    </p>
                  </div>

                  <div className="flex justify-between items-center border-t-2 my-2 pt-2">
                    <h3 className="rounded-xl py-1 px-2.5 bg-gradient-to-r from-[#40c3c2] to-[#0081a7] text-md text-white">
                      #{post.category}
                    </h3>
                    <p className="text-md text-gray-500 flex items-center">
                      <span className="mr-2">
                        <FaComment size={20}></FaComment>
                      </span>
                      {post.commentCount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostList;
