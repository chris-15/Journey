import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'

const Nav = () => {
  // create function here to show Nav bar if user is logged in

  return (
    <header className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-red-500 text-white">
        <h1>Cancer Blog</h1>
        <nav>
          <a href='/' className="mr-4">Log in</a>
          <a href='/'>Sign Up</a>
          
        </nav>
    </header>
  );
};

export default Nav;