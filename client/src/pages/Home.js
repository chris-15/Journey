import PostList from "../components/PostList";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);

  //set the number of initial visible posts on homepage
  const [visiblePosts, setVisiblePosts] = useState(10);

  //function to handle show more posts button by adding 10 posts to the state of visible posts
  const handleLoadMorePosts = () => {
    setVisiblePosts(visiblePosts + 10);
  };

  const posts = data?.posts || {};

  console.log(posts);

  // settings for the framer motion div to transition to the page
  const pageVariants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageVariants}
    >
      <main className="grid grid-cols-1 w-full">
        <div className="text-center mt-5">
          <h2 className="text-2xl">
            Want to add a post!?{" "}
            <span className="font-bold text-[#FF0022] hover:underline ">
              <Link to={"/profile"}>Click Here!</Link>
            </span>
          </h2>
        </div>
        <div className="">
          {loading ? (
            <div>Loading!</div>
          ) : (
            <>
              {/* slicing thru post array to only show 10 posts at time */}
              <PostList
                posts={posts.slice(0, visiblePosts)}
                title="Check out some blog posts!"
              />
              {visiblePosts < posts.length && (
                <div className="flex justify-center">
                  <button
                    className=" py-2 px-4 mb-2 bg-[#FF0022] text-white font-semibold rounded-md hover:bg-red-700 transition duration-300 ease-in-out"
                    onClick={handleLoadMorePosts}
                  >
                    Load More Posts!
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </motion.div>
  );
};

export default Home;
