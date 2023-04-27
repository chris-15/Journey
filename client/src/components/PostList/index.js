import { Link } from "react-router-dom";

const PostList = ({ posts, title }) => {
  if (!posts || !posts.length) {
    return <h3>No Thoughts Yet</h3>;
  }
  return (
    <div>
      <h2 className="py-6 text-4xl text-center">{title}</h2>
      <div className="max-w-[400px] sm:max-w-[600px] md:max-w-[800px] w-full mx-auto">
      {posts &&
        posts.map((post) => (
          <div
            key={post._id}
            className=" border-4 border-solid border-black p-2 my-2"
          >
            <h3 className="text-xl">
            {post.postTitle}  
            </h3>
            <div>
              <Link to={`/post/${post._id}`}>
                <p>{post.username} posted on {post.createdAt}</p>
                <p>Total Comments: {post.commentCount}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default PostList;
