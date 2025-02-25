import './App.css'
import { Layout } from '../Layout/Layout'
import { Routes, Route } from "react-router-dom";
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import StartGame from '../../pages/StartGame/StartGame';
import GamePage from '../../pages/GamePage/GamePage';
import { useEffect} from 'react';
import { useDispatch} from "react-redux";
import { refreshUser } from '../../redux/auth/operations';



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
          dispatch(refreshUser());
  }, [dispatch])

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<RestrictedRoute component={<LoginPage/>} redirectTo='/'/>} />
          <Route path="/register" element={<RestrictedRoute component={<RegisterPage />} redirectTo='/login' />} />
          <Route path='/startgame' element={<PrivateRoute component={<StartGame />} redirectTo='/login' />} />
          <Route path='/game' element={<PrivateRoute component={<GamePage />} redirectTo='/login' />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App
