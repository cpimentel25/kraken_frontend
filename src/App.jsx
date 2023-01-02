import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchValue } from './features/api/callSlice';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import History from './pages/History';
import Charts from './pages/Charts';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AuthPage from './pages/Auth';

import './App.scss';

function App() {
  const [tokenLive, setTokenLive] = useState(false);
  const dispatch = useDispatch();

  const userIsLive = useSelector((state) => state.financeData.user);
  const token = localStorage.getItem('token');

  const dispatchData = () => {
    dispatch(fetchValue());
  };

  useEffect(
    () => {
      if (token === 'undefined' || token === null) {
        return setTokenLive(false)
      }

      setTokenLive(true);
      return dispatchData();
    },
    // eslint-disable-next-line
    [userIsLive]
  );

  return (
    <div className='App'>
        {(!tokenLive) ? (
          <Routes>
          <Route path='/' element={<AuthPage />} />
          </Routes>
        ) : (
          <Routes>
          <Route path='/' element={<Home />} />,
          <Route path='/history' element={<History />} />,
          <Route path='/charts' element={<Charts />} />,
          <Route path='/settings' element={<Settings />} />,
          <Route path='/profile' element={<Profile />} />
          </Routes>
        )}
      {!tokenLive === true ? null : (<NavBar />)}
    </div>
  );
}

export default App;
