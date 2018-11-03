import express from 'express';
import webpackMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from '../webpack.config.js';
const app = express();
const serv = require('http').Server(app);
const io = require('socket.io')(serv,{ wsEngine: 'uws' });
app.use(webpackMiddleware(webpack(webpackConfig)));

io.sockets.on('connection', function(socket) {
  console.log('socket');
});

serv.listen(4000, () => {
  console.log('Listening');
});
