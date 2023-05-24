import PostList from '../components/PostList';

import { useQuery } from '@apollo/client';  
import { QUERY_POST, QUERY_POSTS } from '../utils/queries';

const Home = () => {

    const { loading, data } = useQuery(QUERY_POSTS);

    const posts = data?.posts || {};

    console.log(posts)
    
    return (
        <main className='grid grid-cols-1 h-screen w-full'>
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

