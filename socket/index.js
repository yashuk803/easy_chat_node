module.exports = function(server) {
    //socket.io instantiation
    var io = require("socket.io")(server);
    var sockets = [];

//listen on every connection
    io.on('connection', (socket) => {
        console.log('New user connected');

        //default username
        socket.username = "Anonymous";

        //listen on change_username
        socket.on('change_username', (data, fn) => {
            socket.username = data.username;
            var names = sockets.find(function(socketName) {
                return  data.username === socketName
            });
            if(names) {
                fn('error');
            } else {
                sockets.push(data.username);
                fn(true);
            }
        });

        //listen on new_message
        socket.on('new_message', (data) => {
            //broadcast the new message
            io.sockets.emit('new_message', {message : data.message, username : socket.username});
        });

        //listen on typing
        socket.on('typing', (data) => {
            socket.broadcast.emit('typing', {username : socket.username})
        })
    });
};