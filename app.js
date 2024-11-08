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

io.on('connection', function(socket) {
    console.log('A user connected');
    
    // setTimeout(function() {
    //     socket.emit('myCustomEvent',{description:'Hello world! Send me a message'});
    // }, 3);

    socket.on('myCustomEventFromClient', function(data){
        console.log(data);
        
    });
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
});

http.listen(3000, function() {
    console.log('====================================');
    console.log('Server listening on port 3000');
    console.log('====================================');
});
