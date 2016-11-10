const path = require('path');
const http = require('http');
const express = require('express');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;

var server = http.createServer(app);
const socketIO = require('socket.io');
var io = socketIO(server)

app.use(express.static(publicPath));
app.get('/', (req, res) => {
  res.send(index.html)
})

io.on('connection', (socket) => {
  console.log('New User Connected')

  socket.emit('newMessage', {
    to: 'babes', 
    from:'danny',
    body:'hi love'
  })

  socket.on('disconnect', () => {
    console.log('client disconnected');
  })

  socket.emit('newEmail', {
    from: 'angela@tran.com',
    text: 'yoyoyoy',
    createdAt: 123
  });

  socket.on('createEmail', (newEmail) => {
    console.log('creating email', newEmail);
  })

  socket.on('newMsg', (newMsg) => {
    console.log('message', newMsg);
  })
});


server.listen(port, () => {
  console.log('server is up on port 3000!');
})
