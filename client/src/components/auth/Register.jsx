import React, { useState, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import { useMutation } from 'react-query';
import { API } from '../../config/api';
import { Alert } from 'react-bootstrap';

export default function Register() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //integration
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // Data body
      const body = JSON.stringify(form);

      // Insert data user to database
      const response = await API.post('/register', body, config);

      console.log(response);

      // Notification
      if (response.data.status == 'Success') {
        const alert = (
          <Alert variant="success" className="py-1">
            Success
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: '',
          email: '',
          password: '',
        });
      } else {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });
  // end of integration

  return (
    <div>
      <Button
        variant="none"
        onClick={handleShow}
        className="button btn  me-3 mb-2 mb-lg-0 fw-bold px-4 text-light"
      >
        Register
      </Button>
      {message && message}

      <Modal  show={show} onHide={handleClose}>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <div className="container p-3">
            <label className="fs-1 fw-bold color">Register</label>
            <input
              className="input form-control my-3 "
              type="text"
              placeholder="Email"
              value={email}
              name="email"
              onChange={handleChange}
            />
            <input
              className="input form-control my-3"
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChange}
            />
            <input
              className="input form-control my-3"
              type="text"
              placeholder="Fulll Name"
              value={name}
              name="name"
              onChange={handleChange}
            />
            <button onClick={handleClose} className="button btn w-100 my-3 text-light">
              Register
            </button>
            <div className="text-center ">
              <label className="d-flex flex-row align-items-center justify-content-center">
                Already have an account ? Klik
                <Link className="nav-link color fw-bold p-1 " to="#">
                  Here
                </Link>
              </label>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
