const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', socket => {
  socket.on('join-room', room => {
    socket.join(room);
    socket.to(room).emit('user-joined');

    socket.on('screen-data', data => {
      socket.to(room).emit('screen-data', data);
    });

    socket.on('disconnect', () => {
      socket.to(room).emit('user-left');
    });
  });
});

http.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
