const Nav = () => {
  // create function here to show Nav bar if user is logged in

  return (
    <header className="flex justify-between">
        <h1>Cancer Blog</h1>
        <nav>
          <ul className="flex">
            <li>Login</li>
            <li>SignUp</li>
          </ul>
        </nav>
    </header>
  );
};

export default Nav;