import { Link } from "react-router-dom";

const PostList = ({ posts, title }) => {
  if (!posts || !posts.length) {
    return <h3>No Posts Yet</h3>;
  }
  
  return (

    <div className=" py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {posts &&
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4"><Link to={`/post/${post._id}`}>{post.postTitle}</Link></h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <p className="mr-2">
                        <span className="font-semibold"><Link to={`/profile/${post.username}`}>{post.username}</Link></span> posted on{' '}
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
