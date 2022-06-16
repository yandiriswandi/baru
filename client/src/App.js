import { Routes, Route, useNavigate } from 'react-router-dom';
import AChat from './pages/AChat';
import AddBook from './pages/AddBook';
import ATransaction from './pages/ATransaction';
import Cart from './pages/Cart';
import DetailBook from './pages/DetailBook';
import Home from './pages/Home';
import Profiles from './pages/Profiles';
import UChat from './pages/UChat';

import { API, setAuthToken } from './config/api';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/userContext';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    // Redirect Auth
    if (state.isLogin === false) {
      navigate('/');
    } else {
      if (state.user.status === 'admin') {
        navigate('/add-book');
        // navigate("/complain-admin");
      } else if (state.user.status === 'customer') {
        navigate('/');
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const config = {
        headers: {
          Authorization: 'Basic ' + localStorage.token,
        },
      };
      const response = await API.get('/check-auth', config);
      // If the token incorrect
      if (response.status === 'failed') {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
      // console.log(response);
      // // Get user data
      let payload = response.data.data.user;
      // // Get token from local storage
      payload.token = localStorage.token;

      // // Send data to useContext
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<DetailBook />} />
      <Route path="/profile" element={<Profiles />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/admin-transaction" element={<ATransaction />} />
      <Route path="/chat-user" element={<UChat />} />
      <Route path="/chat-admin" element={<AChat />} />
    </Routes>
  );
}

export default App;
