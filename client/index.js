import 'phaser';

import { Menu } from './scenes/menu';
import { Game } from './scenes/game';


const gameConfig = {
  width: 800,
  height: 800,
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
    Menu,
    Game
  ]
};

const game = new Phaser.Game(gameConfig);
