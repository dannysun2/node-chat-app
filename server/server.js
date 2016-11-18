const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3002;

var server = http.createServer(app);
const socketIO = require('socket.io');
var io = socketIO(server)

const { generateMessage, generateLocationMessage } = require('./utils/message');
var users = [];

app.use(express.static(publicPath));
app.get('/', (req, res) => {
  res.send(index.html)
})

// client connects to the socket
io.on('connection', (socket) => {

  // logs new client on connection
  console.log('user has connected')

  // socket welcomes the user
  socket.emit('newMessage', generateMessage('admin', 'Welcome to the Chat!'))

  socket.on('new-user', (data) => {
    // socket informs everyone else but the new client that a user has joined
    socket.broadcast.emit('newMessage', generateMessage('admin', 'A New User has joined the Chat!'))
    socket.username = data.user;
    users.push(socket.username)
    updateUsers(users)
  })

  function updateUsers(users){
    io.emit('user-list-refresh', users)
  }

  // listen for new messages
  socket.on('createMessage', (message, cb) => {
    // emit to everyone
    io.emit('newMessage', generateMessage(message.from, message.text))
    cb('this from the server');
  })

  socket.on('createLocationMessage', (pos) => {
    io.emit('newLocationMessage', generateLocationMessage('admin', pos.latitude, pos.longitude))
  });

  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket.username, 1))
    io.emit('user-list-refresh', users)
    console.log(socket.username, 'has disconnected');
  })

})

// starting server
server.listen(port, () => {
  console.log(`server is up on port ${port}!`);
})
