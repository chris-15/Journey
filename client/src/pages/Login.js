import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";

const Login = () => {
  const [login, { error }] = useMutation(LOGIN_USER);
  const [formState, setFormState] = useState({ email: "", password: "" });

  // on change function anytime input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (event) {
      console.error(event);
    }

    //clears the form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main>
      <div>
        <form onSubmit={handleFormSubmit}>
          <h2>Login</h2>
          <div>
            <label className="" htmlFor="email">
              Email:
            </label>
            <input
              className=""
              id="email"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="">Password:</label>
            <input
              className=""
              id="password"
              type="password"
              name="password"
              value={formState.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <button className="" type="submit">
              Log In
            </button>
          </div>
        </form>

        {error && <div>Incorrect credentials</div>}
      </div>
    </main>
  );
};

export default Login;
