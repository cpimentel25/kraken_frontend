import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faList, faChartLine, faGear } from '@fortawesome/free-solid-svg-icons'
import './style.scss';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-icons'>
        <div className='navbar-icons_slect'>
          <Link to='/' className='navbar-icons_slect_link'>
            <FontAwesomeIcon icon={faHouse} />
          </Link>
          <Link to='/history' className='navbar-icons_slect_link' >
            <FontAwesomeIcon icon={faList} />
          </Link>
          <Link to='/charts' className='navbar-icons_slect_link' >
            <FontAwesomeIcon icon={faChartLine} />
          </Link>
          <Link to='/settings' className='navbar-icons_slect_link' >
            <FontAwesomeIcon icon={faGear} />
          </Link>
          <Link to='/profile' className='navbar-icons_slect_link' >
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
