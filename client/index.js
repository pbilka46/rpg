import 'phaser';

import { Menu } from './scenes/menu';
import { Game } from './scenes/game';

const io = require('socket.io-client');

const socket = io();

const gameConfig = {
  width: 1280,
  height: 720,
  parent: 'root',
  pixelArt: true,
  physics: {
      default: 'arcade',
      debug:true,
      arcade: {
          gravity: { y: 0 }
      }
  },
  scene: [
    Game,
    Menu
  ]
};

const game = new Phaser.Game(gameConfig);
