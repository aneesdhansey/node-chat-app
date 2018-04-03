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

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app...',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User joined',
        createdAt: new Date().getTime()
    });

    socket.on('disconnect', () => {
        console.log('User disconnected...');
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });



    socket.on('createMessage', (message) => {
        console.log('Create message', message);
        io.emit('newMessage', { ...message, createdAt: new Date().getTime() });

        //socket.broadcast.emit('newMessage', {...message, createdAt: new Date().getTime()})
    });
});

server.listen(port, () => console.log(`Server is up on port ${port}...`));





