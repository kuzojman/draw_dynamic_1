const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);


app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req, res) => 
{
    res.sendfile('/index.html');
});


io.on('connection', (socket) => 
{
    socket.on('json_to_board', (msg) => 
    {
        io.emit('json_to_board',msg);
    });
    socket.on('cursor_coordinates', (msg) => 
    {
        io.sockets.emit('cursor_coordinates',msg);
    });   
});



server.listen(3000, () => 
{
  console.log('listening on *:3000');
});