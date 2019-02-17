$(function(){
    //make connection
    var socket = io.connect('http://localhost:3000');

    //buttons and inputs
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_username = $("#send_username");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");

    //Emit message
    send_message.click(function(){
        socket.emit('new_message', {message : message.val()})
    });

    //Listen on new_message
    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
    });

    //Emit a username
    send_username.click(function(){
        var input = $(this).closest($('#change_username')).find('input[type=text]');
        var self = $(this);
        if(input.val() !== '') {
            socket.emit('change_username', {username : username.val()}, function (data) {
                if(data === 'error') {
                    $('#present').text(input.val() + ' такой пользователь существует, введите другого пользователя');

                } else {
                    $('#present').text('Привет ' + input.val());
                    self.closest($('#change_username')).css('display', 'none');
                    $('#input_zone').css('display', 'block');
                }
            })
        }

    });

    //Emit typing
    message.bind("keypress", () => {
        socket.emit('typing')
    });

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
    })
});