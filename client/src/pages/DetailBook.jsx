import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import Navbar from '../components/navbar/Navbar';
import image from "../images/Product1Big.png";
// import { BsCart4 } from "react-icons/bs";

function DetailBook() {
  return (
    <>
     {/* <Navbar /> */}
      <Container className="mt-4 90vh" style={{ border: "1px solid red" }}>
        <Row className="60vh">
          <Col lg={6} md={6} style={{ border: "1px solid red" }} className='ms-4'>
            <Image src={image} width={436} height={555} fluid/>
          </Col>
          <Col lg={6} md={6} className='my-4 form-product' style={{ border: "2px solid blue" }}>
              <h1 className="text-product mb-3">Guetamala Beans</h1>
              <div className="stock-product mb-3">Stock : 500</div>
              <div className="detail-product mb-3">
                <p>
                  Hampir semua referensi sepakat mengatakan bahwa kopi pertama
                  kali ditemukan di Ethiopia, meskipun ada juga beberapa protes
                  yang menyatakan bahwa Coffea arabica sebenarnya muncul pertama
                  kali di bagian selatan Sudan. Karena para gembala Ethiopia
                  adalah manusia pertama yang mengonsumsi kopi—walau saat itu
                  mereka baru mengonsumsi buah/cherry-nya saja, maka gagasan
                  tentang “Ethiopia sebagai tempat asal kopi” pun semakin kuat.
                </p>
              </div>
              <div className="price-product mb-5">Rp 300.900</div>
              <div className="d-grid gap-1 mb-3">
              <Button className='btn-product'>Add Cart</Button>
              </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DetailBook;
// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import Rectangles from '../images/Rectangles.png';
// import buys from '../images/buys.svg';
// import convertRupiah from 'rupiah-format';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useQuery } from 'react-query';
// import { API } from '../config/api';
// import { Modal, ModalBody } from 'react-bootstrap';

// export default function DetailBook() {
//   //fetching
//   let navigate = useNavigate;
//   let { id } = useParams();
//   const [detailBook, setDetailBook] = useState({});
//   const [isBuy, setIsBuy] = useState(false);

//   const [trigger, setTrigger] = useState(false);
//   const [carts, setCarts] = useState([]);
//   const [alert, setAllert] = useState(false);
//   function handleOpen() {
//     setAllert(true);
//   }

//   function handleClose() {
//     setAllert(false);
//   }

//   //fetch data
//   let { data: product } = useQuery('productCache', async () => {
//     const response = await API.get('/book/' + id);
//     console.log('detailbook', response);
//     return setDetailBook(response.data.data.book);
//   });
//   // console.log('tessss', product);
//   //end of fetching

//   //add cart
//   const addCart = async () => {
//     const config = {
//       headers: {
//         'Content-type': 'application/json',
//       },
//     };

//     // insert to database
//     await API.post(
//       '/cart',
//       {
//         idProduct: id,
//       },
//       config
//     ).catch((err) => console.log(err));
//     handleOpen();
//   };

//   useEffect(() => {
//     API.get(`/purchased/${id}`)
//       .then((res) => {
//         if (res.data.purBook) {
//           setIsBuy(true);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   // useEffect(() => {
//   //   API.get('/carts')
//   //     .then((res) => {
//   //       console.log('INI CART', res);
//   //       setCarts(res.data.getCart);
//   //     })
//   //     .catch((err) => console.log(err));
//   // }, [trigger, alert]);

//   return (
//     <div className="bg-home">
//       <Navbar cartsss={alert} />
//       <div className="container">
//         <div className="row align-items-center">
//           <div className=" col-lg-6 d-flex justify-content-end">
//             <div style={{ width: '400px', height: '577px' }}>
//               <img src={detailBook.bookImg} alt="" className="h-100 w-100" />
//             </div>
//           </div>
//           <div className="col-lg-4">
//             <h1 className="fw-bolder">{detailBook.title}</h1>
//             <h3 className="fw-lighter fs-4 mb-5">{detailBook.author}</h3>
//             <div className="mb-4">
//               <p className="fs-4 fw-bold mb-1">Publication Date</p>
//               <p className="fw-lighter">{detailBook.year}</p>
//             </div>
//             <div className="mb-4">
//               <p className="fs-4 fw-bold mb-1">Pages</p>
//               <p className="fw-lighter">{detailBook.pages}</p>
//             </div>
//             <div className="mb-4">
//               <p className="fs-4 fw-bold mb-1 text-danger">ISBN</p>
//               <p className="fw-lighter">{detailBook.ISBN}</p>
//             </div>
//             <div className="mb-4">
//               <p className="fs-4 fw-bold mb-1">Price</p>
//               <p className="fw-bold text-success">
//                 {convertRupiah.convert(detailBook.price)}
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="mt-5 w-75 m-auto py-3">
//           <h1>About This Book</h1>
//           <div className="aboutbook">
//             <p className="fw-lighter">{detailBook.desc}</p>
//           </div>
//           <div className="d-flex justify-content-end">
//             {isBuy ? (
//               <div
//                 style={{
//                   display: 'flex',
//                 }}
//               >
//                 <button className="btn btn-dark ">
//                   <a
//                     href={detailBook.bookPdf}
//                     style={{ textDecoration: 'none', color: 'white' }}
//                   >
//                     Download
//                   </a>
//                   <span className="ms-3">
//                     <img src={buys} alt="" />
//                   </span>
//                 </button>
//                 {/* <a
//                   style={{
//                     marginLeft: '30px',
//                   }}
//                   href={detailBook.bookPdf}
//                   target="_blank"
//                 >
//                   <span className="ms-3">Download</span>
//                 </a> */}
//               </div>
//             ) : (
//               <button className="btn btn-dark " onClick={() => addCart()}>
//                 Add Cart
//                 <span className="ms-3">
//                   <img src={buys} alt="" />
//                 </span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//       <Modal show={alert} onHide={handleClose}>
//         <ModalBody
//           style={{
//             textAlign: 'center',
//             color: '#469F74',
//             fontSize: '24px',
//           }}
//         >
//           The product is successfully added to the cart
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }

// // import React, { useState, useEffect } from 'react';
// // import Navbar from '../components/navbar/Navbar';
// // import Rectangles from '../images/Rectangles.png';
// // import buys from '../images/buys.svg';
// // import convertRupiah from 'rupiah-format';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import { useQuery } from 'react-query';
// // import { API } from '../config/api';
// // import { Modal, ModalBody } from 'react-bootstrap';

// // export default function DetailBook() {
// //   //fetching
// //   let navigate = useNavigate;
// //   let { id } = useParams();
// //   const [detailBook, setDetailBook] = useState({});

// //   const [trigger, setTrigger] = useState(false);
// //   const [carts, setCarts] = useState([]);
// //   const [alert, setAllert] = useState(false);
// //   function handleOpen() {
// //     setAllert(true);
// //   }

// //   function handleClose() {
// //     setAllert(false);
// //   }

// //   //fetch data
// //   let { data: product } = useQuery('productCache', async () => {
// //     const response = await API.get('/book/' + id);
// //     console.log('detailbook', response);
// //     return setDetailBook(response.data.data.book);
// //   });
// //   //end of fetching

// //   //add cart
// //   const addCart = async () => {
// //     const config = {
// //       headers: {
// //         'Content-type': 'application/json',
// //       },
// //     };

// //     // insert to database
// //     await API.post(
// //       '/cart',
// //       {
// //         idProduct: id,
// //       },
// //       config
// //     ).catch((err) => console.log(err));
// //     handleOpen();
// //   };

// //   // useEffect(() => {
// //   //   API.get('/carts')
// //   //     .then((res) => {
// //   //       console.log('INI CART', res);
// //   //       setCarts(res.data.getCart);
// //   //     })
// //   //     .catch((err) => console.log(err));
// //   // }, [trigger, alert]);

// //   return (
// //     <div className="bg-home">
// //       <Navbar cartsss={alert} />
// //       <div className="container">
// //         <div className="row align-items-center">
// //           <div className=" col-lg-6 d-flex justify-content-end">
// //             <div style={{ width: '400px', height: '577px' }}>
// //               <img src={detailBook.bookImg} alt="" className="h-100 w-100" />
// //             </div>
// //           </div>
// //           <div className="col-lg-4">
// //             <h1 className="fw-bolder">{detailBook.title}</h1>
// //             <h3 className="fw-lighter fs-4 mb-5">{detailBook.author}</h3>
// //             <div className="mb-4">
// //               <p className="fs-4 fw-bold mb-1">Publication Date</p>
// //               <p className="fw-lighter">{detailBook.year}</p>
// //             </div>
// //             <div className="mb-4">
// //               <p className="fs-4 fw-bold mb-1">Pages</p>
// //               <p className="fw-lighter">{detailBook.pages}</p>
// //             </div>
// //             <div className="mb-4">
// //               <p className="fs-4 fw-bold mb-1 text-danger">ISBN</p>
// //               <p className="fw-lighter">{detailBook.ISBN}</p>
// //             </div>
// //             <div className="mb-4">
// //               <p className="fs-4 fw-bold mb-1">Price</p>
// //               <p className="fw-bold text-success">
// //                 {convertRupiah.convert(detailBook.price)}
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="mt-5 w-75 m-auto py-3">
// //           <h1>About This Book</h1>
// //           <div className="aboutbook">
// //             <p className="fw-lighter">{detailBook.desc}</p>
// //           </div>
// //           <div className="d-flex justify-content-end">
// //             <button className="btn btn-dark " onClick={() => addCart()}>
// //               Add Cart
// //               <span className="ms-3">
// //                 <img src={buys} alt="" />
// //               </span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //       <Modal show={alert} onHide={handleClose}>
// //         <ModalBody
// //           style={{
// //             textAlign: 'center',
// //             color: '#469F74',
// //             fontSize: '24px',
// //           }}
// //         >
// //           The product is successfully added to the cart
// //         </ModalBody>
// //       </Modal>
// //     </div>
// //   );
// // }
