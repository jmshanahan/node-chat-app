const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

var app = new express();
var server = http.createServer(app);

const port = process.env.PORT || 3000;
var io = socketIO(server);
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            // socket.broadcast.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
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

