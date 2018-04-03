const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected...');

    socket.on('disconnect', () => {
        console.log('User disconnected...');
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    // socket.emit('newEmail', {
    //     from: 'mike@example.com',
    //     text: 'Hey. What is going on.',
    //     createdAt: new Date().getTime()
    // });

    socket.on('createMessage', (message) => {
        console.log('Create message', message);
        io.emit('newMessage', { ...message, createdAt: new Date().getTime() });
    });

    // socket.emit('newMessage', {
    //     from: 'fluffy@gmail.com',
    //     text: 'Hi from fluffy',
    //     createdAt: new Date().getTime()
    // });
});

server.listen(port, () => console.log(`Server is up on port ${port}...`));





