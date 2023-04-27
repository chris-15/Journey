import { Link } from "react-router-dom";

const PostList = ({ posts, title }) => {
  if (!posts || !posts.length) {
    return <h3>No Thoughts Yet</h3>;
  }
  return (
    <div>
      <h2 className="my-4 text-xl">{title}</h2>
      {posts &&
        posts.map((post) => (
          <div
            key={post._id}
            className=" border-4 border-solid border-black p-2"
          >
            <h3>
              {post.username} posted on {post.createdAt}
            </h3>
            <div>
              <Link to={`/post/${post._id}`}>
                <p>{post.postText}</p>
                <p>Total Comments: {post.commentCount}</p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostList;
