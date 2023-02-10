import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCreateUser } from '../../../features/api/callSlice';
import { gql, useLazyQuery } from '@apollo/client';

import './style.scss';

const GET_USER_HY_EMAIL = gql`
  query UserByEmail($email: String) {
    userByEmail(email: $email) {
      email
    }
  }
`;

const RegisterForm = (prop) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const [search, { called, loading, data }] = useLazyQuery(GET_USER_HY_EMAIL, {
    onCompleted: () => {
      console.log('complete search');
    },
  });

  useEffect(() => {

    if (called && !loading) {

      if (data?.userByEmail[0]?.email === form.email) {
        return console.log('Find user by email submit');
      }
      dispatch(postCreateUser(form));
      prop.show(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (called && loading) return <p>Loading ...</p>;

  const handleSubmit = async (event) => {
    event.preventDefault();
    await search({ variables: { email: form.email } });
  };

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  return (
    <div className='register'>
      <form className='register-form' onSubmit={handleSubmit}>
        <div className='register-form_firstName'>
          <input
            className='register-form_firstName_input'
            placeholder='First Name'
            id='firstName'
            type='text'
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <span className='register-form_firstName_input-validity'></span>
        </div>
        <div className='register-form_lastName'>
          <input
            className='register-form_lastName_input'
            placeholder='Last Name'
            id='lastName'
            type='text'
            value={form.lastName}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='register-form_email'>
          <input
            className='register-form_email_input'
            placeholder='Email'
            id='email'
            type='email'
            value={form.email}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='register-form_password'>
          <input
            className='register-form_password_input'
            placeholder='Password'
            id='password'
            type='password'
            value={form.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div className='register-form_button'>
          <button
            className='register-form_button_send'
            type='submit'
            value='submit'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
