import 'phaser';

const directions = {
  west: { offset: 0, x: 2, y: 0, opposite: 'east' },
  northWest: { offset: 32, x: -2, y: -1, opposite: 'southEast' },
  north: { offset: 64, x: 0, y: -2, opposite: 'south' },
  northEast: { offset: 96, x: 2, y: -1, opposite: 'southWest' },
  east: { offset: 128, x: 2, y: 0, opposite: 'west' },
  southEast: { offset: 160, x: 2, y: 1, opposite: 'northWest' },
  south: { offset: 192, x: 0, y: 2, opposite: 'north' },
  southWest: { offset: 224, x: -2, y: 1, opposite: 'northEast' }
};

const anims = {
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
export class Skeleton extends Phaser.GameObjects.Sprite {
    constructor (scene, cursors, x = 240, y = 290, motion = 'idle', direction = 'southEast', distance = 100)
    {
      super(scene, x, y, motion, direction, distance);
      this.animationDelay = 500;
      this.startX = x;
      this.startY = y;
      this.distance = distance;
      this.cursors = this.scene.input.keyboard.createCursorKeys();

      this.motion = motion;
      this.anim = anims[motion];
      this.direction = directions[direction];
      this.speed = 0.45;
      this.f = this.anim.startFrame;

      Phaser.GameObjects.Image.call(this, scene, x, y, 'skeleton', this.direction.offset + this.f);

      this.depth = y + 64;

      this.scene.time.delayedCall(this.anim.speed * this.animationDelay, this.changeFrame, [], this);
  };

  create() {
  }

  changeFrame()
    {
      const delay = this.anim.speed;
      if (this.f < this.anim.startFrame) {
        this.f = this.anim.startFrame;
      }
      
      this.f++;
      
      if (this.f >= this.anim.endFrame)
      {
        this.f = this.anim.startFrame;
      }
      
      this.frame = this.texture.get(this.direction.offset + this.f);
      this.scene.time.delayedCall(delay * this.animationDelay, this.changeFrame, [], this);
      
    };

    update()
    {
      if (this.cursors.down.isDown)
      {
        
        if (this.cursors.right.isDown) {
          this.direction = directions.southEast;
          this.x += this.direction.x * this.speed;
          this.y += this.direction.y * this.speed;
          this.depth = this.y + 64;
        } else if (this.cursors.left.isDown) {
  
          this.direction = directions.southWest;
          this.x += this.direction.x * this.speed;
          this.y += this.direction.y * this.speed;
          this.depth = this.y + 64;
        } else {
          this.direction = directions.south;
          this.x -= this.direction.x * this.speed;
          this.y += this.direction.y * this.speed;
          this.depth = this.y + 64;
        }
        
        this.motion = 'walk';
        this.anim = anims.walk;
      } else if (this.cursors.up.isDown) {
        if (this.cursors.right.isDown) {
          this.direction = directions.northEast;
          this.x += this.direction.x * this.speed;
          this.y += this.direction.y * this.speed;
          this.depth = this.y + 64;
        } else if (this.cursors.left.isDown) {
          this.direction = directions.northWest;
          this.x += this.direction.x * this.speed;
          this.y += this.direction.y * this.speed;
          this.depth = this.y + 64;
        } else {
          this.direction = directions.north;
          this.x -= this.direction.x * this.speed;
          this.y += this.direction.y * this.speed;
          this.depth = this.y + 64;
        }
        

        this.motion = 'walk';
        this.anim = anims.walk;
      } else if (this.cursors.left.isDown) {
        this.direction = directions.west;
        this.x -= this.direction.x * this.speed;
        this.y += this.direction.y * this.speed;
        this.depth = this.y + 64;

        this.motion = 'walk';
        this.anim = anims.walk;
      } else if (this.cursors.right.isDown) {
        this.direction = directions.east;
        this.x += this.direction.x * this.speed;
        this.y -= this.direction.y * this.speed;
        this.depth = this.y + 64;

        this.motion = 'walk';
        this.anim = anims.walk;
      } else {
  
        this.motion = 'idle';
        this.anim = anims.idle;
      }
  
    }
}
