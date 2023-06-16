import PostList from "../components/PostList";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_POSTS } from "../utils/queries";
import { useState } from "react";
import { motion } from "framer-motion";

import heroImg from "../assets/photos/hero.jpg";

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);

  //set the number of initial visible posts on homepage
  const [visiblePosts, setVisiblePosts] = useState(9);

  //function to handle show more posts button by adding 10 posts to the state of visible posts
  const handleLoadMorePosts = () => {
    setVisiblePosts(visiblePosts + 3);
  };

  const posts = data?.posts || {};

  console.log(posts);

  // settings for the framer motion div to transition to the page
  const pageVariants = {
    initial: {
      opacity: 0.75,
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
        {/* hero section*/}
        <div className="relative">
          <div className="absolute inset-0">
            <img
              src={heroImg}
              alt="Group Therapy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative flex flex-col justify-center items-center px-4 md:px-8 py-16 md:py-20 ">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Journey
            </h1>
            <p className="text-lg mb-6 sm:px-32 lg:px-60 px-8 text-white">
              Welcome to Journey, a safe space for cancer warriors. Here, you
              can freely express your triumphs and setbacks without judgment.
              Connect with others who understand and provide unwavering support.
              Share your story, inspire others, and be inspired. Start your
              courageous journey today.
            </p>
            <h2 className="text-2xl">
              <Link
                to={"/profile"}
                className="px-4 py-2 text-white font-semibold rounded-xl bg-[#0081a7] hover:underline hover:bg-gradient-to-r from-[#0081a7] to-[#40c3c2]"
              >
                Get Started →
              </Link>
            </h2>
          </div>
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
                <div className="flex justify-center mb-4">
                  <button
                    className="px-4 py-2 text-white font-semibold rounded-md bg-[#0081a7] hover:underline hover:bg-gradient-to-r from-[#0081a7] to-[#40c3c2]"
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
