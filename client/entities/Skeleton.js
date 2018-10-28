import 'phaser';

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
export class Skeleton extends Phaser.GameObjects.Sprite {
    constructor (scene, cursors, x = 240, y = 290, motion = 'idle', direction = 'southEast', distance = 100)
    {
      super(scene, x, y, motion, direction, distance);
      this.animationDelay = 700;
      // console.log(cursors)
      // console.log(this)
      // console.log(scene)
      // super({ key: 'skeleton' }); <- konstruktor na którym się wyjebałeś
      this.startX = x;
      this.startY = y;
      this.distance = distance;
      this.cursors = this.scene.input.keyboard.createCursorKeys();

      this.motion = motion;
      this.anim = anims[motion];
      this.direction = directions[direction];
      this.speed = 0.55;
      this.f = this.anim.startFrame;

      Phaser.GameObjects.Image.call(this, scene, x, y, 'skeleton', this.direction.offset + this.f);

      this.depth = y + 64;

      this.scene.time.delayedCall(this.anim.speed * this.animationDelay, this.changeFrame, [], this);
  };

  create() {
  }

  changeFrame()
    {
        this.f++;
        // if (this.f <= this.anim.endFame) {
        //   this.f++;
        // } else {
        //   this.f = this.anim.startFrame;
        // }
        var delay = this.anim.speed;
        console.log(this.motion)
        console.log(this.frame)
        if (this.f === this.anim.endFrame)
        {
          console.log(this.f)
            switch (this.motion)
            {
                case 'walk':
                    this.f = this.anim.startFrame;
                    this.frame = this.texture.get(this.direction.offset + this.f);
                    this.scene.time.delayedCall(delay * this.animationDelay, this.changeFrame, [], this);
                    break;

                case 'attack':
                    delay = Math.random() * 2;
                    this.scene.time.delayedCall(delay * this.animationDelay, this.resetAnimation, [], this);
                    break;

                case 'idle':
                    this.scene.time.delayedCall(delay * this.animationDelay, this.resetAnimation, [], this);
                    break;

                case 'die':
                    this.scene.time.delayedCall(delay * this.animationDelay, this.resetAnimation, [], this);
                    break;
            }
        }
        else
        {
            this.frame = this.texture.get(this.direction.offset + this.f);

            this.scene.time.delayedCall(delay * this.animationDelay, this.changeFrame, [], this);
        }
    };

    resetAnimation()
    {
        this.f = this.anim.startFrame;

        this.frame = this.texture.get(this.direction.offset + this.f);

        this.scene.time.delayedCall(this.anim.speed * this.animationDelay, this.changeFrame, [], this);
    };

    update()
    {
        if (this.cursors.up.isDown)
        {
          this.x += this.direction.x * this.speed;
          // if (this.direction.y !== 0)
          // {
              this.y -= this.direction.y * this.speed;
              this.depth = this.y + 64;
          // }
        }

        if (this.cursors.down.isDown)
        {
          this.x -= this.direction.x * this.speed;
          // if (this.direction.y !== 0)
          // {
              this.y += this.direction.y * this.speed;
              this.depth = this.y + 64;
          // }
        }



    }

}
