import express from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';

const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv,{});

app.use(webpackMiddleware(webpack(webpackConfig)));

serv.listen(4000, () => {
  console.log('Listening');
});


const SOCKET_LIST = {};
const PLAYER_LIST = {};

const Player = (id) => {
  const self = {
    playerId: id,
    x: 200,
    y: 200
  };

  return self;
};

io.sockets.on('connection', (socket) => {
  socket.id = Math.random();
  SOCKET_LIST[socket.id] = socket;

  const player = Player(socket.id);
  PLAYER_LIST[socket.id] = player;

  socket.emit('players', PLAYER_LIST);
  socket.broadcast.emit('newPlayer', PLAYER_LIST[socket.id]);

  socket.on('disconnect', () => {
    delete SOCKET_LIST[socket.id];
    delete PLAYER_LIST[socket.id];

    io.emit('disconnect', socket.id);
  })
});

setInterval(() => {
  const data = [];
  for (let i in PLAYER_LIST) {
    const player = PLAYER_LIST[i];
    player.x++;
    player.y++;
    data.push({
      x: player.x,
      y: player.y,
    })
  }

  for (let i in SOCKET_LIST) {
    const socket = SOCKET_LIST[i];
    socket.emit('position', data);
  }
}, 100/25);
