import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'

const Nav = () => {
  // create function here to show Nav bar if user is logged in

  // need to change a tags to use link tags and set up routes using react router dom

  return (
    <header className="w-full h-[80px] flex justify-between items-center px-4 bg-red-500 text-white">
        <h1 className='text-2xl'>Cancer Blog</h1>
        <nav>
        
          <a className="mr-4 text-2xl">Log in</a>
          <a href='/' className='text-2xl'>Sign Up</a>
          
        </nav>
    </header>
  );
};

export default Nav;