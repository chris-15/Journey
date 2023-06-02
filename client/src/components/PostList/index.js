import { Link } from "react-router-dom";

const PostList = ({ posts, title }) => {
  if (!posts || !posts.length) {
    return (
    <div className="">
      <h3 className="text-center text-3xl font-bold mt-12">No Posts Yet</h3>
    </div>
    )
  }
  
  return (

    <div className=" py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts &&
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border-solid border-2 rounded-lg overflow-hidden transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 hover:text-[#40c3c2] hover:underline"><Link to={`/post/${post._id}`}>{post.postTitle}</Link></h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <p className="mr-2">
                      <span className="text-black font-extrabold hover:text-[#40c3c2]"><Link to={`/profile/${post.username}`}>{post.username}</Link></span> posted on{' '}
                      {post.createdAt}
                    </p>
                    <p className="border-l-2 pl-2 ml-2 text-gray-500">
                      Total Comments: {post.commentCount}
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
