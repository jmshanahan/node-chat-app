const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

var app = new express();
var server = http.createServer(app);

const port = process.env.PORT || 3000;
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log("Create message ",  message);
        io.emit('newMessage', generateMessage( message.from, message.text));
        callback('This is from the server');
    });
    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage',generateLocationMessage('Admin',
        coords.latitude, coords.longitude));
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');

    });
});

app.use(express.static(path.join(__dirname, '../public')));
app.get('/', (req, res) => {

    res.render('index');
});

server.listen(port, () => { console.log(`Server is up on port ${port}`) });

