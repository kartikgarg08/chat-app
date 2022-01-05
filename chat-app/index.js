const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'public')));
const users = {}

io.on('connection', (socket)=> {

    console.log(`Connection ESTD. --> ${socket.id}`);
    
    socket.on('send-msg', (data)=> {
        io.emit('receive-msg', {
            msg: data.msg,
            user: users[socket.id]
        })
    });

    socket.on('login', (data)=> {
        users[socket.id] = data.user;
    });

});

const port = process.env.PORT || 3000;

server.listen(port, ()=> {
    console.log(`Server running at port ${port}`);
});