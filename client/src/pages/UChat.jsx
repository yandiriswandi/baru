import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import cssModule from './UChat.module.css';
import avatarIcon from '../images/Profile.png';
import background from '../assets/background.png';
import sendIcon from '../assets/sendIconBlack.png';
import NavbarUser from '../components/navbar/Navbar';
import { UserContext } from '../context/userContext';
import { io } from 'socket.io-client';
import logOn from '../assets/Ellipse_4.png';

let socket;

function Complain() {
  document.title = `WaysBook | Complain Page`;

  const [contact, setContact] = useState({});
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(false);
  const [form, setForm] = useState({
    chatM: '',
  });

  const [state] = useContext(UserContext);

  useEffect(() => {
    socket = io('http://localhost:5000', {
      auth: {
        token: localStorage.getItem('token'),
      },
      // code here
    });

    socket.on('new message', () => {
      socket.emit('load messages', contact?.id);
    });

    // listen error sent from server
    socket.on('connect_error', (err) => {
      console.error(err.message); // not authorized
    });

    loadMessages();

    if (!messages[messages.length - 1]?.message) {
      setOnline(false);
    } else if (messages[messages.length - 1]?.idSender == contact?.id) {
      setOnline(true);
    }

    return () => {
      socket.disconnect();
    };
  }, [form, messages]); // code here

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // used for active style when click contact
  const onClickContact = () => {
    socket.emit('load admin contact');

    socket.on('admin contact', (data) => {
      setContact(data);
    });

    socket.emit('load messages', contact.id);
  };

  const loadMessages = () => {
    socket.on('messages', (data) => {
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }));
        console.log(dataMessages);
        setMessages(dataMessages);
      } else {
        setMessages([]);
      }
    });
  };

  const onSendMessage = (e) => {
    if (e.key === 'Enter') {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      };

      if (data.message) {
        socket.emit('send message', data);
        form.chatM = '';
      }
    }
  };

  const handleSubmit = () => {
    const data = {
      idRecipient: contact.id,
      message: form.chatM,
    };

    if (data.message) {
      socket.emit('send message', data);
      form.chatM = '';
    }
  };

  const handleOffline = () => {
    const data = {
      idSender: null,
      idRecipient: null,
      message: null,
    };

    socket.emit('send message offline', data);

    setOnline(false);
  };

  return (
    <div
      style={{
        backgroundColor: '#E5E5E5',
        backgroundImage: `url(${background})`,
        backgroundSize: '100%',
        height: '100%',
        paddingTop: '10px',
        paddingBottom: '37px',
      }}
    >
      <NavbarUser hOff={handleOffline} />
      <Container>
        <Row sm={2} className={cssModule.chatBoxHeader}>
          <Col sm={1}>
            <img src={avatarIcon} alt="" />
          </Col>
          <Col sm={11}>
            <p>Admin</p>
            {online && (
              <p // Tandain ini onlennnnnnnnnnnnn
                style={{
                  fontSize: '11px',
                }}
              >
                <img
                  style={{
                    width: '10px',
                    height: '10px',
                  }}
                  src={logOn}
                  alt=""
                />{' '}
                Online
              </p>
            )}
          </Col>
        </Row>
        <Row sm={10} className={cssModule.chatBoxBody}>
          <div
            id="chat-messages"
            style={{ height: '70vh' }}
            className="overflow-auto px-3 py-2"
          >
            {messages.map((item, index) => (
              <div key={index}>
                <div
                  className={`d-flex py-1 ${
                    item.idSender === state.user.id
                      ? 'justify-content-end'
                      : 'justify-content-start'
                  }`}
                >
                  <div
                    className={
                      item.idSender === state.user.id
                        ? cssModule.chatMe
                        : cssModule.chatOther
                    }
                  >
                    {item.message}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Row
            style={{
              height: '10%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            className={cssModule.chatSend}
          >
            <Col sm={11}>
              <input
                type="text"
                name="chatM"
                value={form.chatM}
                onClick={onClickContact}
                onChange={handleChange}
                onKeyPress={onSendMessage}
                placeholder="Start typing to load message ..."
              />
            </Col>
            <Col
              style={{
                padding: '0px',
              }}
              sm={1}
            >
              <button onClick={handleSubmit}>
                <img src={sendIcon} alt="" />
              </button>
            </Col>
          </Row>
        </Row>
      </Container>
    </div>
  );
}

export default Complain;

// import React from "react";
// import ChatHeader from "../components/chat/ChatHeader";
// import Navbar from "../components/navbar/Navbar";

// export default function UChat() {
//   return (
//     <div className="bg-homes">
//       <Navbar />
//       <div className="">
//         <div className="chat-header d-flex overflow-auto">
//           <ChatHeader />
//         </div>
//         <div className="chat-body overflow-auto">
//           <div className="d-flex p-2 w-75">
//             <p className="bg-light py-1 px-3 rounded m-0">hallo</p>
//           </div>
//           <div className="d-flex p-2 w-75 ms-auto">
//             <p className="bg-light py-1 px-3 rounded m-0 ms-auto">
//               hallo faf aajf ajfbbaj ajfba ajfja ajfbaj
//             </p>
//           </div>
//         </div>
//         <div className="chat-footer">
//           <form>
//             <div className="d-flex m-auto pb-lg-5" style={{ width: "95%" }}>
//               <input type="text" className="form-control me-2 " />
//               <button className="btn btn-info px-3"> &#9658;</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
