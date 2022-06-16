import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import users from '../../images/users.svg';
import Complaint from '../../images/Complaint.svg';
import logouts from '../../images/logouts.svg';
import AddBooks from '../../images/AddBooks.svg';
import { UserContext } from '../../context/userContext';

export default function ProfDown() {
  let navigate = useNavigate;
  const [state, dispatch] = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false);
  const logout = () => {
    console.log(state);
    dispatch({
      type: 'LOGOUT',
    });
    navigate('/');
  };

  // console.log(state);
  let dropDown = '';
  if (state.user.role == 'admin') {
    dropDown = (
      <>
        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/add-book">
            <img
              src={AddBooks}
              alt=""
              style={{ width: '2rem', height: '2rem' }}
              className="me-3"
            />
            Add Book
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/admin-transaction">
            <img
              src={Complaint}
              alt=""
              style={{ width: '2rem', height: '2rem' }}
              className="me-3"
            />
            Transaction
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/chat-admin">
            <img
              src={Complaint}
              alt=""
              style={{ width: '2rem', height: '2rem' }}
              className="me-3"
            />
            Complain
          </Link>
        </li>
      </>
    );
  } else {
    dropDown = (
      <>
        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/profile">
            <img
              src={users}
              alt=""
              style={{ width: '2rem', height: '2rem' }}
              className="me-3"
            />
            Profile
          </Link>
        </li>
        <li className="nav-item mb-3">
          <Link className="dropdown-item fw-bold" to="/chat-user">
            <img
              src={Complaint}
              alt=""
              style={{ width: '2rem', height: '2rem' }}
              className="me-3"
            />
            Complain
          </Link>
        </li>
      </>
    );
  }
  return (
    <ul
      className="dropdown-menu navbar-profile"
      aria-labelledby="navbarScrollingDropdown"
    >
      {dropDown}
      <li>
        <hr className="dropdown-divider my-2" />
      </li>

      <li className="nav-item">
        <Link onClick={logout} className="dropdown-item fw-bold" to="#">
          <img
            src={logouts}
            alt=""
            style={{ width: '2rem', height: '2rem' }}
            className="me-3"
          />
          Logout
        </Link>
      </li>
    </ul>
  );
}
