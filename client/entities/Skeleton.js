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
    speed: 0.88,
    delay: 100
  },
  walk: {
    startFrame: 4,
    endFrame: 12,
    speed: 0.88,
    delay: 80
  },
  attack: {
    startFrame: 12,
    endFrame: 20,
    speed: 0.88,
    delay: 100
  },
  die: {
    startFrame: 20,
    endFrame: 28,
    speed: 0.2,
    delay: 0
  },
  shoot: {
    startFrame: 28,
    endFrame: 32,
    speed: 0.1,
    delay: 0
  }
};
export class Skeleton extends Phaser.GameObjects.Sprite {
    constructor (scene, cursors, x = 240, y = 290, motion = 'idle', direction = 'southEast', distance = 100)
    {
      super(scene, x, y, motion, direction, distance);
      this.animationDelay = 80 ;
      this.startX = x;
      this.startY = y;
      this.distance = distance;
      this.cursors = this.scene.input.keyboard.createCursorKeys();

      this.motion = motion;
      this.anim = anims[motion];
      this.direction = directions[direction];
      this.speed = 0.11;
      this.f = this.anim.startFrame;

      Phaser.GameObjects.Image.call(this, scene, x, y, 'skeleton', this.direction.offset + this.f);

      this.depth = y + 64;

      this.scene.time.delayedCall(100, this.changeFrame, [], this);
      this.scene.time.delayedCall(50, this.countSteps, [], this);
  };

  changeFrame() {
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
      this.scene.time.delayedCall(this.anim.delay * delay, this.changeFrame, [], this);
  };

  countSteps = () => {
    this.stepsNumber++;
    if(this.stepsNumber < 20) {
      this.speed = this.speed * 1.1225;
    }
    this.scene.time.delayedCall(50, this.countSteps, [], this);
  };

    changeAnimation = (animationType) => {
      this.motion = animationType;
      this.anim = anims[animationType];
    };

  isMoving = () => {
    return anims.walk === this.anim;
  };

  movementHandling = () => {
  const speed = this.speed;
    if(!this.attacking) {
        if (this.cursors.down.isDown) {
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
            this.changeAnimation('walk');
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

            this.changeAnimation('walk');
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

            this.changeAnimation('walk');
        } else {
            this.changeAnimation('idle');
            this.stepsNumber = 0;
            this.speed = 0.11;
            this.anim.delay = anims.idle.delay;
        }
    }
  };

  attackHandling = () => {
    const key = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    if (key.isDown) {
      this.changeAnimation('attack')
      this.attacking = true;
    } else {
      this.attacking = false;
    }
  };

  update()
  {
    /*
     * handles movement in 8 directions
    */
    this.movementHandling();

    /*
      handles attack animation
    */
    this.attackHandling();

  }
}
