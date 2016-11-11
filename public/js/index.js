var socket = io();
socket.on('connect', function() {
  console.log('connected to server');
})

socket.on('disconnect', function() {
  console.log('disconnected from server');
})

// listening FROM server for new message
socket.on('newMessage', function(obj) {
  var li = jQuery('<li></li>')
  li.text(`${obj.from}: ${obj.text}`)

  jQuery('#message-list').append(li)
})

socket.on('newLocationMessage', function(obj) {
  var li = jQuery('<li></li>')
  li.html(`${obj.from}: <a href='${obj.url}'>Current Location</a>`)

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

var locationButton = jQuery('#send-location');
locationButton.on('click', function(e){
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
