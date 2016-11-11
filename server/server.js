const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

var server = http.createServer(app);
const socketIO = require('socket.io');
var io = socketIO(server)

const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));
app.get('/', (req, res) => {
  res.send(index.html)
})

// client connects to the socket
io.on('connection', (socket) => {

  // logs new client on connection
  console.log('user has connected')

  // socket welcomes the user
  socket.emit('newMessage', generateMessage('admin', 'welcome welcome'))

  // socket informs everyone else but the new client that a user has joined
  socket.broadcast.emit('newMessage', generateMessage('admin', 'new user has joined'))

  // listen for new messages
  socket.on('createMessage', (message, cb) => {
    console.log('createMessage', message)

    // emit to everyone
    io.emit('newMessage', generateMessage(message.from, message.text))
    cb('this from the server');
  })

  socket.on('disconnect', () => {
    console.log('client disconnected');
  })

})

// starting server
server.listen(port, () => {
  console.log('server is up on port 3000!');
})
