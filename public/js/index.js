const socket = io();

socket.on('connect', function () {
    console.log('Connected to server...');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server...');
});

socket.on('newEmail', function (email) {
    console.log('New email', email);
});

socket.on('newMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();

    html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {

    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $('#location-message-template').html();

    html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    $('#messages').append(html);
});

$(document).ready(function () {

    $('#message-form').on('submit', function (e) {
        e.preventDefault();

        var messageTextBox = $('[name=message]');
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val()
        }, function () {
            messageTextBox.val('');
        });
    });

    var locationButton = $('#send-location');
    locationButton.on('click', function () {
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser');
        }

        locationButton.attr('disabled', 'disabled').text('Sending location...');

        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send Location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function (error) {
            locationButton.removeAttr('disabled').text('Send Location');
            alert('Unable to fetch location');
        });
    });

});

