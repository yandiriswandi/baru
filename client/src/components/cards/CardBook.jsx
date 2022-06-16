import React from 'react';
import { Link } from 'react-router-dom';
import Rectangle from '../../images/Rectangle.png';
import styles from './CardBook.module.css';
import { Col } from 'react-bootstrap';
import convertRupiah from 'rupiah-format';

export default function CardBook({ item, index }) {
  return (
    <Col className=" mb-3">
      <div className='bg'>
      <Link
        to={'/detail/' + item.id}
        key={index}
        className="bg price text-decoration-none"
      >
        <img
          src={item.bookImg}
          alt="Thumbnail"
          className="img-cardProduct"
        />
        <h5 className="color ms-2">RWANDA beans</h5>
        <h6 className={`${styles.price} mt-2 ms-2`}>
          {convertRupiah.convert(item.price)}
        </h6>
        <h6 className={`${styles.price} mt-2 ms-2`}>
          Stock : 99
        </h6>
      </Link>
      </div>
    </Col>
  );
}
