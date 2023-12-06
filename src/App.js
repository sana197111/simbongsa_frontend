import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { PageTransition } from '@steveeeie/react-page-transition';
// import { Main } from './components/Main';
import Main from './components/Main';
import MbtiTest from './components/MbtiTest';
import Result from './components/Result';
import Login from './components/Login';
import Signup from './components/Signup';
import VolunteerDetail from './components/VolunteerDetail';
import VolunteerList from './components/VolunteerList';
import Mypage from './components/Mypage';
import CompanyLogin from './components/CompanyLogin';

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const location = useLocation();
  
  return (
    // <PageTransition
    //   preset="roomToLeft"
    //   transitionKey={location.pathname}
    // >
    <Routes location={location}>
      <Route path="/" element={< Main />} />
      <Route path="/mbtitest" element={< MbtiTest />} />
      <Route path="/mbtitest/:type" element={<Result />} />
      <Route path="/signup" element={< Signup />} />
      <Route path="/login" element={< Login />} />
      <Route path="/volunteer/:event_id" element={<VolunteerDetail />} />
      <Route path="/volunteerlist" element={<VolunteerList />} />
      <Route path="/mypage" element={<Mypage />} />
      <Route path="/company-login" element={<CompanyLogin />} />
    </Routes>
  );
}

export default App;