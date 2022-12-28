import { useEffect } from 'react';
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
  const dispatch = useDispatch();
  const dispatchData = () => {
    dispatch(fetchValue());
  };

  const tokenIsLive = useSelector((state) => state.financeData.user.token);
  const userIsLive = useSelector((state) => state.financeData.user);

  useEffect(
    () => {
      dispatchData();
      localStorage.setItem('token', tokenIsLive)
    },
    // eslint-disable-next-line
    [userIsLive]
  );


  return (
    <div className='App'>
        {(!tokenIsLive) ? (
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
      {!tokenIsLive ? null : (<NavBar />)}
    </div>
  );
}

export default App;
