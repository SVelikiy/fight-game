import './App.css'
import { Layout } from '../Layout/Layout'
import { Routes, Route } from "react-router-dom";
import RestrictedRoute from '../RestrictedRoute/RestrictedRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import HomePage from '../../pages/HomePage/HomePage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import RegisterPage from '../../pages/RegisterPage/RegisterPage';
import StartGame from '../../pages/StartGame/StartGame';

function App() {

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<RestrictedRoute component={<LoginPage/>} redirectTo='/startgame'/>} />
          <Route path="/register" element={<RestrictedRoute component={<RegisterPage />} redirectTo='/login' />} />
          <Route path='startgame' element={<PrivateRoute component={<StartGame/>} redirectTo='/login' />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App
