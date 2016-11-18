// var socket = io();

var socket = io.connect("http://localhost:8080");




socket.on('connect', function() {
  console.log('connected to server');
})

socket.on('disconnect', function() {
  console.log('disconnected from server');
})

socket.on('user-list-refresh', function(users){
  var html = '';
  users.forEach(function(user){
    html += `<div class="chat-member"><div class="img-container"><a href="#"><img class="mg-responsive" src="img/ui-254/2.jpg" alt=""></a><span class="st-live status"></span></div><h4><a href="#">${user}</a></h4><p>I am online now.</p><div class="clearfix"></div></div>`
    console.log('added user', user);
  })
  $('.chat-contact').html(html)
})

// listening FROM server for new message
socket.on('newMessage', function(obj) {
  // var div = jQuery(`<div class='chat-message left'><i class="fa fa-user-circle fa-3 message-avatar" aria-hidden="true"></i><div class='message'><a class='message-author'>${obj.from}</a><span class='message-date'>${obj.createdAt}</span><span class='message-content'>${obj.text}</span></div></div>`)
  var div = jQuery(`<div class="chat-box chat-in"><div class="img-container"><img class="img-responsive" src="img/ui-254/4.jpg" alt=""></div><div class="message"><h5>${obj.from.toUpperCase()}&nbsp;&nbsp;<i class="fa fa-clock-o"></i>&nbsp; ${obj.createdAt}</h5><p>${obj.text}</p></div><div class="clearfix"></div></div>`)
  jQuery('.chat-content').append(div)
  $(".chat-content").scrollTop($(".chat-content").prop("scrollHeight"));
})

socket.on('newLocationMessage', function(obj) {
  console.log(obj)
  var div = jQuery(`<div class='chat-message left'><i class="fa fa-user-circle fa-3 message-avatar" aria-hidden="true"></i><div class='message'><a class='message-author'>${obj.from}</a><span class='message-date'>${obj.createdAt}</span><span class='message-content'><a href='${obj.url}'>Current Location</a></span></div></div>`)
  jQuery('.chat-content').append(div)
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

jQuery('#user-form').on('submit', function(e){
  e.preventDefault();
  socket.emit('new-user', { user: $('#username').val() })
  $('#username').val('')
  $('.ui-254').show()
  $('#userLogin').hide()
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

$(".chat-contact").niceScroll({
  cursorcolor:"#999",
  cursoropacitymin:0,
  cursoropacitymax:0.3,
  cursorwidth:5,
  cursorborder:"0px",
  cursorborderradius:"0px",
  cursorminheight:50,
  zindex:1,
  mousescrollstep:20,
 nativeparentscrolling: true
});

$(".chat-content").niceScroll({
  cursorcolor:"#999",
  cursoropacitymin:0,
  cursoropacitymax:0.3,
  cursorwidth:5,
  cursorborder:"0px",
  cursorborderradius:"0px",
  cursorminheight:50,
  zindex:1,
  mousescrollstep:20,
  nativeparentscrolling: true
});
