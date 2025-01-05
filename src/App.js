import Login from './authentication/Login';
import Signup from './authentication/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import SnackBar from './snackbar/snackbar';
import { Provider } from "react-redux";
import ProtectedRoute from './protectedRoute/protectedRoute';
import GuestRoute from './protectedRoute/GuestRoute';
import store from './redux/Store';
import HomePage from './homePage/HomePage';
import Header from './header/Header';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import InteractionPage from './components/InteractionPage';
import AnalyticsPage from './components/AnalyticsPage';
import './App.css';

function App() {


  const user = useSelector((state) => state.user.userId);

 
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<GuestRoute> <Login /> </GuestRoute>} />
        <Route path="/" element={<ProtectedRoute><Header /><HomePage /></ProtectedRoute>} />
        <Route path="/interactions" element={<ProtectedRoute><Header /><InteractionPage /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Header /><AnalyticsPage /></ProtectedRoute>} />
      </Routes>
      <SnackBar />
    </div>
  );
}

export default App;
