require('dotenv').config();
const express = require('express');
const router = require('./src/routes');
const bp = require('body-parser');
const app = express();

const port = 5000;
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

require('./src/socket')(io);

app.use(express.json());
app.use(cors());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use('/api/v1/', router);

server.listen(port, () => console.log(`Listening on port ${port}!`));
