import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import email from '../images/email.svg';
import gender from '../images/gender.svg';
import telepon from '../images/telepon.svg';
import address from '../images/address.svg';
import ProfileTwo from '../images/ProfileTwo.svg';
import CardBuy from '../components/cards/CardBuy';
import { useQuery } from 'react-query';
import { UserContext } from '../context/userContext';
import { API } from '../config/api';
import { Modal, Container, Row } from 'react-bootstrap';
import styles from './Profiles.module.css';

export default function Profiles() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [myBook, setMyBook] = useState([]);
  console.log('inibuku', myBook);
  const [preview, setPreview] = useState(null); //For image preview

  const [dtlProfile, setDtlProfile] = useState({});
  //fetch profile data from database
  // let { data: profile } = useQuery('profileCache', async () => {
  //   const response = await API.get('/profile');
  //   console.log(response);
  //   return setProfile(response.data.data.profile);
  // });
  // const [profile1, setProfile] = useState([]);

  // //update profile
  const [form, setForm] = useState({
    gender: '',
    phone: '',
    address: '',
    avatar: '',
  });
  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  function handleOpen() {
    setModalShow(true);
  }

  function handleClose() {
    setModalShow(false);
    navigate('/profile');
  }

  useEffect(() => {
    API.get('/profile')
      .then((res) => {
        setDtlProfile(res.data.data.profile);
        setPreview(res.data.data.profile.avatar);
        setForm({
          ...form,
          gender: dtlProfile.gender,
          phone: dtlProfile.phone,
          address: dtlProfile.address,
        });
      })
      .catch((err) => console.log(err));

    API.get('/purchased-books')
      .then((res) => {
        setMyBook(res.data.purBook);
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, [modalShow]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Store data with FormData as object
    const formData = new FormData();

    if (form.avatar) {
      formData.set('avatar', form.avatar[0], form.avatar[0]?.name);
    }
    formData.set('address', form.address);
    formData.set('gender', form.gender);
    formData.set('phone', form.phone);

    // Configuration
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    // Insert product data
    await API.patch('/profile', formData, config);

    setModalShow(false);
  };

  const navDtl = (par1) => {
    navigate(`/detail/${par1}`);
  };

  return (
    <div className="bg-homes">
      <Navbar />
      <div className="container profile-bg p-2">
        <div className="mb-3 p-0">
          <h3>Profile</h3>
        </div>
        <div
          className="p-lg-5 px-3 profiles-item m-auto rounded "
          style={{ background: '#FFD9D9' }}
        >
          <div className="row ">
            <div className="row col ">
              <img
                className=" p-0"
                src={email}
                alt=""
                style={{ height: '50px', width: '50px' }}
              />
              <div className="col-lg-11 col-10 mb-4">
                <p className="m-0 fw-bold">{state.user.email}</p>
                <p className="m-0 fw-lighter">Email</p>
              </div>
              <img
                className=" p-0"
                src={gender}
                alt=""
                style={{ height: '50px', width: '50px' }}
              />
              <div className="col-lg-11 col-10 mb-4">
                <p className="m-0 fw-bold">{dtlProfile.gender}</p>
                <p className="m-0 fw-lighter">Gender</p>
              </div>
              <img
                className=" p-0"
                src={telepon}
                alt=""
                style={{ height: '50px', width: '50px' }}
              />
              <div className="col-lg-11 col-10 mb-4">
                <p className="m-0 fw-bold">{dtlProfile.phone}</p>
                <p className="m-0 fw-lighter">Mobile phone</p>
              </div>
              <img
                className=" p-0"
                src={address}
                alt=""
                style={{ height: '50px', width: '50px' }}
              />
              <div className="col-lg-11 col-10 mb-4">
                <p className="m-0 fw-bold">{dtlProfile.address}</p>
                <p className="m-0 fw-lighter">Address</p>
              </div>
            </div>

            <div className="col-lg-4 p-0 py-3">
              <div>
                <img
                  className="w-100 h-100 mb-3"
                  src={dtlProfile.avatar}
                  alt="pp"
                />
              </div>
              <div className="nav-item bg-danger rounded">
                <center>
                  <button
                    className="bg-danger rounded"
                    onClick={handleOpen}
                    style={{
                      color: 'white',
                      alignItems: 'center',
                      outline: 'none',
                      width: 310,
                    }}
                  >
                    Edit Profile
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '50px' }}></div>
      <Container className="mt-5 mb-4">
        <h1>My Book</h1>

        <Row md={5} sm={2} xs={2}>
          {myBook?.map((item, index) => (
            <CardBuy item={item} index={index} />
          ))}
        </Row>
      </Container>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        style={{
          position: 'absolute',
          top: '100px',
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className={styles.editForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                value={form.gender}
                onChange={handleChange}
                name="gender"
                id="gender"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Format : 0812-8888-8888"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                value={form.address}
                onChange={handleChange}
                name="address"
                id="address"
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="avatar">
                <div className={styles.formGroupImage}>
                  <span>Avatar/Profile Picture</span>
                  <div className={styles.uploadImage}>
                    <h5>Upload File</h5>
                    {preview && <img src={preview} alt="" />}
                  </div>
                </div>
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleChange}
                hidden
              />
            </div>
            <div className={styles.btnSubmit}>
              <button type="submit">Submit</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
