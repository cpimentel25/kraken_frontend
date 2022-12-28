import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCreateUser } from '../../../features/api/callSlice';

import './style.scss';

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(postCreateUser(form));
  }

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]:value });
  };

  // console.log(form)

  return (
    <div className='register'>
      <form className='register-form'>
        <div className='register-form_firstName'>
          {/* <label className='register-form_firstName_label'>First Name</label> */}
          <input
            className='register-form_firstName_input'
            placeholder='First Name'
            id='firstName'
            type='text'
            value={form.firstName}
            onChange={handleChange}
          ></input>
        </div>
        <div className='register-form_lastName'>
          {/* <label className='register-form_lastName_label'>Last Name</label> */}
          <input
            className='register-form_lastName_input'
            placeholder='Last Name'
            id='lastName'
            type='text'
            value={form.lastName}
            onChange={handleChange}
          ></input>
        </div>
        <div className='register-form_email'>
          {/* <label className='register-form_email_label'>Email</label> */}
          <input
            className='register-form_email_input'
            placeholder='Email'
            id='email'
            type='text'
            value={form.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className='register-form_password'>
          {/* <label className='register-form_password_label'>Password</label> */}
          <input
            className='register-form_password_input'
            placeholder='Password'
            id='password'
            type='password'
            value={form.password}
            onChange={handleChange}
          ></input>
        </div>
        <div className='register-form_button'>
          <button
            className='register-form_button_send'
            type='submit'
            value='submit'
            onClick={handleSubmit}
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
