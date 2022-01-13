const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendfile('/index.html');
});

io.on('connection', (socket) => {
    socket.on('json_to_board', (data) => {
        io.emit('json_to_board', data);
    });
    socket.on('cursor_coordinates', (data) => {
        io.sockets.emit('cursor_coordinates', data);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});