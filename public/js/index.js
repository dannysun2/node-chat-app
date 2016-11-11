var socket = io();
socket.on('connect', function() {
  console.log('connected to server');
})

socket.on('disconnect', function() {
  console.log('disconnected from server');
})

// listening FROM server for new message
socket.on('newMessage', function(obj) {
  console.log(obj);
  var li = jQuery('<li></li>')
  li.text(`${obj.from}: ${obj.text}`)

  jQuery('#message-list').append(li)
})



// form handling
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  },
  function(){
  });
});
