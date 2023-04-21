import { LOGIN_USER } from '../utils/mutations';
import { useMutation } from '@apollo/client';  
import Auth from '../utils/auth';


const Login = () => {

    const [login, { error }] = useMutation(LOGIN_USER);
    const [formState, setFormState] = useState({ email: '', password: ''});




  return (
    <main>
        <div>
            <form>
                <h2>Login</h2>
               <div>
               <label className='' htmlFor='email'>
                    Email:
                </label>
                <input className='' id='email' type='email' name='email'/>
               </div>

               <div>
                <label className=''>
                    Password:
                </label>
                <input className='' id='password' type='password' name='password'/>
               </div>

               <div>
                <button className='' type='submit'>
                    Log In
                </button>
               </div>
            </form>
        </div>
    </main>
  )
}

export default Login