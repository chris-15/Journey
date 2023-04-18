

const PostList = ({ posts, title }) => {
   
    if (!posts || !posts.length) {
        return <h3>No Thoughts Yet</h3>;
      }
  return (
    <div>
        <h3>{title}</h3>
        {posts && 
            posts.map(post => (
                <div key={post._id}>
                    <p>
                        {post.username}
                        posted on {post.createdAt}
                    </p>
                    <div>
                        <p>{post.postText}</p>
                    </div>    

                </div>  
            ))}
    </div>
  ) 
}

export default PostList;