import React from 'react';
import { Link } from 'react-router-dom';
import Rectangle from '../../images/Rectangle.png';
import convertRupiah from 'rupiah-format';
import { API } from '../../config/api';

export default function CardPromo({ item, index, alertpromos }) {
  const handleSubmit = async (addcart) => {
    try {
      // Configuration
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      API.post('/cart', { idProduct: addcart }, config);
      alertpromos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" container-fluid row ">
      <div className="col">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ width: '500px' }}
        >
          <div className="p-0" style={{ width: '236px', height: '345px' }}>
            <Link to={'/detail/' + item.id} key={index}>
              <img
                src={item.bookImg}
                alt=""
                className="img-fluid h-100 w-100"
              />
            </Link>
          </div>
          <div
            className="col d-none d-sm-block px-2 py-3 nav-item "
            style={{ background: 'white' }}
          >
            <Link to="/detail" className=" nav-link p-0 text-dark">
              <p className=" fw-bold fs-4 m-0 lh-sm">{item.title}</p>
            </Link>
            <p className="fw-lighter mt-2">{item.author}</p>
            <div className="textPromo ">
              <p className="lh-sm">{item.desc}</p>
            </div>
            <div>
              <p className="text-success fs-4 fw-bold">
                {convertRupiah.convert(item.price)}
              </p>
            </div>
            <div className="">
              <button
                className="btn btn-dark w-100"
                onClick={() => handleSubmit(item.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
