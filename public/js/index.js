var socket = io();
socket.on('connect', function() {
  console.log('connected to server');
})

socket.on('disconnect', function() {
  console.log('disconnected from server');
})

// listening FROM server for new message
socket.on('newMessage', function(obj) {
  var div = jQuery(`<div class='chat-message left'><i class="fa fa-user-circle fa-3 message-avatar" aria-hidden="true"></i><div class='message'><a class='message-author'>${obj.from}</a><span class='message-date'>${obj.createdAt}</span><span class='message-content'>${obj.text}</span></div></div>`)
  jQuery('.chat-discussion').append(div)
})

socket.on('newLocationMessage', function(obj) {
  console.log(obj)
  var div = jQuery(`<div class='chat-message left'><i class="fa fa-user-circle fa-3 message-avatar" aria-hidden="true"></i><div class='message'><a class='message-author'>${obj.from}</a><span class='message-date'>${obj.createdAt}</span><span class='message-content'><a href='${obj.url}'>Current Location</a></span></div></div>`)
  jQuery('.chat-discussion').append(div)
})



// form handling
jQuery('#message-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message-field]').val()
  },
  function(){
  });
  jQuery('[name=message-field]').val('')
});

var locationButton = $('#send-location');
locationButton.on('click', function(e){
  console.log('clicked')
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by the browser.')
  }

  navigator.geolocation.getCurrentPosition(function(pos){

    socket.emit('createLocationMessage', {
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    })
  }, function(err) {
    alert('Unable to fetch', err)
  })

})
