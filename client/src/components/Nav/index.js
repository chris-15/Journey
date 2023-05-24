import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Nav = () => {

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  

  return (
    <header className="w-full h-[80px] flex justify-between items-center px-4 bg-[#FF0022] text-white shadow-xl">
      <Link to="/">
        <h1 className="text-2xl">Cancer Blog</h1>
      </Link>

      <nav>
        {Auth.loggedIn() ? (
          <>
            <Link to={"/profile"} className="mr-4 text-2xl hover:underline">
              My Profile
            </Link>
            <a className="text-2xl hover:underline" href="/" onClick={logout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4 text-2xl hover:underline">
              Log in
            </Link>
            <Link to="/signup" className="text-2xl hover:underline">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Nav;
