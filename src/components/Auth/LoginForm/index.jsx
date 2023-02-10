import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUser } from '../../../features/api/callSlice';

import './style.scss';

const LoginForm = () => {
  const [form, setFrom] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(postUser(form));
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setFrom({ ...form, [id]: value });
  };

  return (
    <main className='login'>
      <form className='login-form'>
        <div className='login-form_email'>
          <label className='login-form_email_label' htmlFor='email'>
            Email
          </label>
          <input
            className='login-form_email_input'
            id='email'
            type='text'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className='login-form_password'>
          <label className='login-form_password_label' htmlFor='password'>
            Password
          </label>
          <input
            className='login-form_password_input'
            id='password'
            type='password'
            placeholder='Password'
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className='login-button'>
          <button
            className='login-button_login'
            type='submit'
            value='submit'
            onClick={handleSubmit}
          >
            Log in
          </button>
        </div>
      </form>
    </main>
  );
};

export default LoginForm;
