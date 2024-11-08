var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    var options = {
        root: path.join(__dirname),
        dotfiles: 'deny',
        index: ['index.html']
    }
    res.sendFile('index.html', options);
});

let user = 0;

io.on('connection', function(socket) {
    console.log('A user connected');

    user++;
    
    // Broadcast to all clients the number of connected users
    io.emit('broadcast', { message: `${user} user(s) connected` });

    socket.on('disconnect', function() {
        user--;
        console.log('User disconnected');
        // Broadcast the updated count after a user disconnects
        io.emit('broadcast', { message: `${user} user(s) connected` });
    });
});

http.listen(3000, function() {
    console.log('====================================');
    console.log('Server listening on port 3000');
    console.log('====================================');
});
