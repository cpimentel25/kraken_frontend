import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchRoster, setActiveUser } from './features/api/callSlice';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Charts from './pages/Charts';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AuthPage from './pages/Auth';
import FormStart from './pages/Start';
import Search from './pages/Search';

import './App.scss';

function App() {
  const [tokenLive, setTokenLive] = useState(false);
  const dispatch = useDispatch();

  const userIsLive = useSelector((state) => state.financeData.user);
  const activeUser = useSelector((state) => state.financeData?.userActive);
  const token = localStorage.getItem('token');

  const userActive = userIsLive.profile?.isActive;

  const dispatchData = () => {
    dispatch(fetchRoster());
    if (userActive) {
      dispatch(setActiveUser(true))
    }
  };

  useEffect(
    () => {
      if (token === 'undefined' || token === null) {
        return setTokenLive(false);
      }
      setTokenLive(true);
      return dispatchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userIsLive, activeUser, token]
  );

  return (
    <div className='App'>
      <div className='App-content'>
        {!tokenLive ? null : !activeUser ? null : <NavBar />}
        {!tokenLive ? (
          <Routes>
            <Route path='/' element={<AuthPage />} />
          </Routes>
        ) : !activeUser ? (
          <Routes>
            <Route path='/' element={<FormStart />} />
          </Routes>
        ) : (
          <Routes>
            <Route path='/' element={<Home />} />,
            <Route path='/search' element={<Search />} />,
            <Route path='/charts' element={<Charts />} />,
            <Route path='/settings' element={<Settings />} />,
            <Route path='/profile' element={<Profile />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
