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
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight mb-8 pb-10 border-b-2">{title}</h2>
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-3 ">
          {posts &&
            posts.map((post) => (
              <div
                key={post._id}
                className=" overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                <div className="pt-6 ">
                  {/* date and category */}
                  <div className="flex space-x-4 items-center text-xs">
                    <h3 className="text-gray-500">
                      {post.createdAt.split(" at")[0]}
                    </h3>
                    <h3 className="rounded-full py-1 px-2.5 bg-gradient-to-r from-[#40c3c2] to-[#0081a7] text-white font-medium">
                      #{post.category}
                    </h3>
                  </div>

                    {/* post title and post preview */}
                  <div>
                    <h3 className="text-2xl font-semibold my-4 hover:text-[#40c3c2] hover:underline">
                      <Link to={`/post/${post._id}`}>{post.postTitle}</Link>
                    </h3>

                    <p className="mb-4 text-gray-500 line-clamp-2 text-sm">
                      {post.postText}
                    </p>
                  </div>

                  <div className="flex justify-between items-center my-2 pt-2">
                  <p className="mr-2 text-black font-extrabold hover:text-[#40c3c2]">
                        <Link to={`/profile/${post.username}`}>
                          {post.username}
                        </Link>
                    </p>
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
