console.log('loaded!');

var socket = io();
socket.on('connect', function() {

  socket.emit('newMsg', {
    to: 'PrinPrin',
    from: 'nellybear',
    body: 'hey sis!'
  })

})

socket.on('disconnect', function() {
  console.log('disconnected');
})

socket.on('newEmail', function(obj) {
  console.log('new email');
  console.log(obj);
})

socket.on('newMessage', function(obj) {
  console.log(obj)
})
