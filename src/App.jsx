import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchCategorie, fetchRoster } from './features/api/callSlice';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Charts from './pages/Charts';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import AuthPage from './pages/Auth';
import FormStart from './pages/Start';

import './App.scss';
import Search from './pages/History';

function App() {
  const [tokenLive, setTokenLive] = useState(false);
  const dispatch = useDispatch();

  const userIsLive = useSelector((state) => state.financeData.user);
  const token = localStorage.getItem('token');

  const userActive = userIsLive.profile?.isActive;

  const dispatchData = () => {
    // dispatch(fetchValue());
    dispatch(fetchRoster());
    if (userActive) {
      dispatch(fetchCategorie());
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
    // eslint-disable-next-line
    [userIsLive]
  );


  return (
    <div className='App'>
      {!tokenLive ? null : !userActive ? null : <NavBar />}
      {!tokenLive ? (
        <Routes>
          <Route path='/' element={<AuthPage />} />
        </Routes>
      ) : !userActive ? (
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
  );
}

export default App;
