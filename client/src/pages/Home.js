import PostList from '../components/PostList';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';  
import { QUERY_POSTS } from '../utils/queries';

const Home = () => {

    const { loading, data } = useQuery(QUERY_POSTS);

    const posts = data?.posts || {};

    console.log(posts)
    
    return (
        <main className='grid grid-cols-1 w-full'>
            <div className='text-center mt-5'>
                <h2 className='text-2xl'>Want to add a post!? <span className='font-bold text-[#FF0022] hover:underline '><Link to={"/profile"}>Click Here!</Link></span></h2>
                
            </div>
            <div className=''>
                {loading ? (
                    <div>Loading!</div>
                ): (
                    <PostList posts={posts} title="Check out some blog posts!"/>
                )}
            </div>
        </main>
    )
}

export default Home;

