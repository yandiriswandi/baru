import React, { useEffect, useState } from 'react';
import { Modal, ModalBody } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import rupiahFormat from 'rupiah-format';
import CardCart from '../components/cards/CardCart';
import Navbar from '../components/navbar/Navbar';
import { API } from '../config/api';
import attach from '../images/AttacheTransaction.png';

export default function Cart() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [alert, setAllert] = useState(false);
  const [trx, setTrx] = useState(false);
  const [alerts, setAlerts] = useState(false);

  const handleTransacion = async () => {
    await API.post('/transaction')
      .then((res) => {
        /* console.log(res); */

        const token = res.data.payment.token;

        window.snap.pay(token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */

            console.log(result);
            setAlerts(true);
            setTimeout(setAlerts, 3000);
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            console.log(result);
            setAlerts(true);
            setTimeout(setAlerts, 3000);
          },
          onError: function (result) {
            /* You may add your own implementation here */
            console.log(result);
          },
          onClose: function () {
            /* You may add your own implementation here */
            alert('you closed the popup without finishing the payment');
          },
        });
      })
      .catch((err) => console.log(err));
    openTrx();
  };

  // midtrans
  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    //change this according to your client-key
    const myMidtransClientKey = 'SB-Mid-client-tX9lnKYWM6zZbOpm';

    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);
  // end of midtrans

  //alert delete cart
  function handleOpen() {
    setAllert(true);
  }

  function handleClose() {
    setAllert(false);
  }

  //alert buy product
  function openTrx() {
    setTrx(true);
  }

  function closeTrx() {
    setTrx(false);
    navigate('/profile');
  }

  useEffect(() => {
    API.get('/carts')
      .then((res) => {
        console.log('INI CART', res);
        setCarts(res.data.getCart);
      })
      .catch((err) => console.log(err));
  }, [trigger, alert]);

  return (
    <div className="bg-homes">
      <Navbar cartsdelete={alert} />
      <div className="container cart-bg ">
        <div className="col">
          <div>
            <h3 className="mb-lg-5 mb-2">My Cart</h3>
            <p>Review Your Order</p>
          </div>
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="border border-dark mb-2"></div>
              {carts.map((item, index) => (
                <CardCart anjay={handleOpen} item={item} index={index} />
              ))}
              <div className="border border-dark mb-2"></div>
            </div>
            <div className="col-lg-4 col-12">
              <div className="border border-dark"></div>
              <div className="d-flex justify-content-between">
                <p className=" my-2 fw-bold">SubTotal</p>
                <p className=" my-2 fw-normal">
                  {rupiahFormat.convert(
                    carts
                      .map((item) => {
                        return item.total;
                      })
                      .reduce((a, b) => a + b, 0)
                  )}
                </p>
              </div>
              <div className="d-flex justify-content-between">
                <p className=" my-2 fw-bold">Qty</p>
                <p className=" my-2 fw-normal">
                  {carts
                    .map((item) => {
                      return item.qty;
                    })
                    .reduce((a, b) => a + b, 0)}
                </p>
              </div>

              <div className="border border-dark"></div>

              <div className="d-flex justify-content-between">
                <p className="text-success my-2 fw-bold">Total</p>
                <p className="text-success my-2 fw-bold">
                  {rupiahFormat.convert(
                    carts
                      .map((item) => {
                        return item.total;
                      })
                      .reduce((a, b) => a + b, 0)
                  )}
                </p>
              </div>

              {/* <form className=""> */}
              <button
                onClick={() => handleTransacion()}
                type="submit"
                className="button btn btn-dark w-100"
              >
                Pay
              </button>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
      <Modal show={alert} onHide={handleClose}>
        <ModalBody
          style={{
            textAlign: 'center',
            color: 'red',
            fontSize: '24px',
          }}
        >
          remove product success
        </ModalBody>
      </Modal>
      <Modal
        style={{
          top: '100px',
        }}
        show={trx}
        onHide={closeTrx}
      >
        <ModalBody
          style={{
            textAlign: 'center',
            color: '#469F74',
            fontSize: '24px',
          }}
        >
          Thank you for ordering in us, please wait 1 x 24 hours to verify you
          order
        </ModalBody>
      </Modal>
    </div>
  );
}
