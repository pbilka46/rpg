import 'phaser';
import { Skeleton } from '../entities/Skeleton';
var directions = {
    west: { offset: 0, x: -2, y: 0, opposite: 'east' },
    northWest: { offset: 32, x: -2, y: -1, opposite: 'southEast' },
    north: { offset: 64, x: 0, y: -2, opposite: 'south' },
    northEast: { offset: 96, x: 2, y: -1, opposite: 'southWest' },
    east: { offset: 128, x: 2, y: 0, opposite: 'west' },
    southEast: { offset: 160, x: 2, y: 1, opposite: 'northWest' },
    south: { offset: 192, x: 0, y: 2, opposite: 'north' },
    southWest: { offset: 224, x: -2, y: 1, opposite: 'northEast' }
};

var anims = {
    idle: {
        startFrame: 0,
        endFrame: 4,
        speed: 0.2
    },
    walk: {
        startFrame: 4,
        endFrame: 12,
        speed: 0.15
    },
    attack: {
        startFrame: 12,
        endFrame: 20,
        speed: 0.11
    },
    die: {
        startFrame: 20,
        endFrame: 28,
        speed: 0.2
    },
    shoot: {
        startFrame: 28,
        endFrame: 32,
        speed: 0.1
    }
};

var skeletons = [];

var tileWidthHalf;
var tileHeightHalf;

var d = 0;


export class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'game' });
  }

  preload ()
  {
      this.load.json('map', './isometric-grass-and-water.json');
      this.load.spritesheet('tiles', './isometric-grass-and-water.png', { frameWidth: 64, frameHeight: 64 });
      this.load.spritesheet('skeleton', './skeleton8.png', { frameWidth: 128, frameHeight: 128 });
      this.load.image('house', './rem_0002.png');
  }

  create ()
  {

     //  Our Skeleton class

     this.buildMap();
     this.placeHouses();
     skeletons.push(this.add.existing(new Skeleton(this)));

     this.cameras.main.setSize(800, 800);
   }

  buildMap ()
  {
      //  Parse the data out of the map
      var data = this.cache.json.get('map');

      var tilewidth = data.tilewidth;
      var tileheight = data.tileheight;

      tileWidthHalf = tilewidth / 2;
      tileHeightHalf = tileheight / 2;

      var layer = data.layers[0].data;

      var mapwidth = data.layers[0].width;
      var mapheight = data.layers[0].height;

      var centerX = mapwidth * tileWidthHalf;
      var centerY = 16;

      var i = 0;

      for (var y = 0; y < mapheight; y++)
      {
          for (var x = 0; x < mapwidth; x++)
          {
              const id = layer[i] - 1;

              var tx = (x - y) * tileWidthHalf;
              var ty = (x + y) * tileHeightHalf;

              var tile = this.add.image(centerX + tx, centerY + ty, 'tiles', id);

              tile.depth = centerY + ty;

              i++;
          }
      }
  }

  placeHouses ()
  {
      var house = this.add.image(240, 370, 'house');

      house.depth = house.y + 86;

      house = this.add.image(1300, 290, 'house');

      house.depth = house.y + 86;
  }

  update() {
    skeletons.forEach(function (skeleton) {
        skeleton.update();
    });
  }

}
