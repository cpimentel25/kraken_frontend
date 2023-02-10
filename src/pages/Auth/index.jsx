import { useState } from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm';
import { useEffect } from 'react';

import './styles.scss';

const AuthPage = () => {
  const [isShown, setIsShown] = useState(true);
  const background = 'https://source.unsplash.com/random/600x900';

  // const handleClick = (event) => {
  //   setIsShown((current) => !current);
  // };

  const testShow = (data) => {
    setIsShown(data)
  };

  useEffect(() => {
    setIsShown(true);
  }, []);

  return (
    <main className='authPage'>
      <section className='authPage-components'>
        <div className='authPage-selector'>
          <div className='authPage-selector-auth'>
            <p
              className='authPage-selector-auth_login'
              onClick={() => setIsShown(true)}
              style={isShown === true ? { color: '#fff' } : null}
            >
              Login
            </p>
            <p
              className='authPage-selector-auth_register'
              onClick={() => setIsShown(false)}
              style={isShown === false ? { color: '#fff' } : null}
            >
              Register
            </p>
          </div>
          <div className='authPage-selector_component'>
            {isShown === true ? <LoginForm /> : <RegisterForm show={testShow}/>}
          </div>
          <div className='authPage-selector_bott'>
            <p className='authPage-selector_bott_text'>
              Learn more about the project{' '}
              <span style={{ color: 'rgba(52, 153, 255, 1)' }}>Kraken</span> and
              support its growth.
            </p>
            <p className='authPage-selector_bott_info'>
              Kraken v0.1.2 by{' '}
              <a
                target='blank'
                className='authPage-selector_bott_info-linkedIn'
                href='https://www.linkedin.com/in/camilo-pimentel-0a0232217/'
              >
                Camilo Pimentel
              </a>
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className='authPage-bg'>
          <img className='authPage-bg_img' alt='background' src={background} />
        </div>
      </section>
    </main>
  );
};

export default AuthPage;
