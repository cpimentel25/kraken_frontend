import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faUser,
  faChartLine,
  faGear,
  faRightFromBracket,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../features/api/callSlice';
import { useState } from 'react';

import './style.scss';

const NavBar = () => {
  const [select, setSelect] = useState('home');

  const user = useSelector((state) => state.financeData?.user?.profile);
  const nameAvatar = user.firstName + user.lastName;
  const avatar = `https://robohash.org/${nameAvatar}.png`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    navigate('/');
    dispatch(reset());
  };

  return (
    <main className='navbar'>
      <section className='navbar-profile'>
        <div className='navbar-profile_avatar'>
          {user?.avatar ? (
            <img
              className='navbar-profile_avatar-img'
              alt='avatar'
              src={user.avatar}
            />
          ) : (
            <img
              className='navbar-profile_avatar-img'
              alt='avatar'
              src={avatar}
            />
          )}
        </div>
        <div className='navbar-profile_fullname'>
          <p>Welcome,</p>
          <p className='navbar-profile_fullname-name'>
            {user.firstName} {user.lastName}
          </p>
        </div>
      </section>
      <section className='navbar-icons'>
        <div className='navbar-icons_slect'>
          <Link
            to='/'
            className='navbar-icons_slect_link'
            style={
              select === 'home' ? { background: 'rgba(52, 153, 255, 1)' } : null
            }
            onClick={() => setSelect('home')}
          >
            <FontAwesomeIcon
              className='navbar-icons_slect_link-icon'
              icon={faHouse}
            />
            <p className='navbar-icons_slect_link-title'>Home</p>
          </Link>
          <Link
            to='/search'
            className='navbar-icons_slect_link'
            style={
              select === 'search'
                ? { background: 'rgba(52, 153, 255, 1)' }
                : null
            }
            onClick={() => setSelect('search')}
          >
            <FontAwesomeIcon
              className='navbar-icons_slect_link-icon'
              icon={faMagnifyingGlass}
            />
            <p className='navbar-icons_slect_link-title'>Search</p>
          </Link>
          <Link
            to='/charts'
            className='navbar-icons_slect_link'
            style={
              select === 'charts'
                ? { background: 'rgba(52, 153, 255, 1)' }
                : null
            }
            onClick={() => setSelect('charts')}
          >
            <FontAwesomeIcon
              className='navbar-icons_slect_link-icon'
              icon={faChartLine}
            />
            <p className='navbar-icons_slect_link-title'>Charts</p>
          </Link>
          <Link
            to='/settings'
            className='navbar-icons_slect_link'
            style={
              select === 'settings'
                ? { background: 'rgba(52, 153, 255, 1)' }
                : null
            }
            onClick={() => setSelect('settings')}
          >
            <FontAwesomeIcon
              className='navbar-icons_slect_link-icon'
              icon={faGear}
            />
            <p className='navbar-icons_slect_link-title'>Settings</p>
          </Link>
          <Link
            to='/profile'
            className='navbar-icons_slect_link'
            style={
              select === 'profile'
                ? { background: 'rgba(52, 153, 255, 1)' }
                : null
            }
            onClick={() => setSelect('profile')}
          >
            <FontAwesomeIcon
              className='navbar-icons_slect_link-icon'
              icon={faUser}
            />
            <p className='navbar-icons_slect_link-title'>Profile</p>
          </Link>
        </div>
      </section>
      <section className='navbar-bottom'>
        <div className='navbar-bottom_logout' onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} />
          <p className='navbar-bottom_logout-title'>Session end</p>
        </div>
      </section>
    </main>
  );
};

export default NavBar;
