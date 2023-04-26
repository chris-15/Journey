import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [addUser, { error }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (event) {
      console.error(event);
    }
  };

  return (
    <main>
        <div>
            <form>
                <h2>
                    Create Your Account
                </h2>
                {/* username */}
                <div>
                    <label htmlFor='username'>Username</label>
                    <input id='username' type='username' name='username'></input>
                </div>

                {/* email */}
                <div>
                    <label htmlFor='email'>Email</label> 
                    <input id='email' type='email' name='email'></input> 
                </div>

                {/* password */}
                <div>
                    <label htmlFor='password'>Password</label> 
                    <input id='password' type='password' name='password'></input> 
                </div>

                <div>
                    <button type='submit'>CREATE ACCOUNT</button>
                </div>

                <div>
                    <p>Already have an account? Log in</p>
                </div>
            </form>
        </div>
    </main>
  )
}

export default Signup