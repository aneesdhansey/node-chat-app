const socket = io();

socket.on('connect', function () {
    console.log('Connected to server...');

    socket.emit('createEmail', {
        to: 'jen@example.com',
        text: 'Hey this is Anees'
    });

    socket.emit('createMessage', {
        from: 'Anees',
        text: 'Random Text Message'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server...');
});

socket.on('newEmail', function(email){
    console.log('New email', email);
});

socket.on('newMessage', function(message) {
    console.log('New message', message);
})

