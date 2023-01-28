import { useState } from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm';
import { useEffect } from 'react';

import './styles.scss';

const AuthPage = () => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  useEffect(
    () => {
      setIsShown(true)
    },
    []
  );

  return (
    <div className='authPage'>
      <div className='authPage-components'>
        {isShown === true ? <LoginForm /> : <RegisterForm /> }
        <div className='authPage-selector'>
          <button className='authPage-selector_button' onClick={handleClick}>
            {isShown === true ? (
              <div>
                <h2>Register</h2>
              </div>
            ) : (
              <div>
                <h2>login</h2>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
