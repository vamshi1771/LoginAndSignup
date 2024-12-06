import Login from './authentication/Login';
import Signup from './authentication/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import SnackBar from './snackbar/snackbar';
import { Provider } from "react-redux";
import ProtectedRoute from './protectedRoute/protectedRoute';
import store from './redux/Store';
import HomePage from './homePage/HomePage';
import { useSelector } from "react-redux";
import './App.css';

function App() {


  const user = useSelector((state) => state.user.userId);
  
  return (
    <div className="App">
      <Routes> 
      {  <Route  path="/Login" element={<Login />} />}
        <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
      </Routes>
    <SnackBar/>
    </div>
  );
}

export default App;
