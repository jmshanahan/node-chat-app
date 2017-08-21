const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

var app = new express();
var server = http.createServer(app);

const port = process.env.PORT || 3000;
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage',{
        from: 'mike@example.com',
        text: 'Hey.; Whats going on 1',
        createdAt: 123
    });
    socket.on('createMessage', (message )=>{
        console.log('createMessage', message);
    });
    socket.on('disconnect',() => {
        console.log('User was disconnected');
    });
});

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {

    res.render('index');
});

server.listen(port, () => { console.log(`Server is up on port ${port}`) });

