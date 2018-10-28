export class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

  preload() {
    this.load.image(
      'bg',
      'bg.png'
    );
  }

  create() {
    this.image = this.add.image(460, 460, 'bg');
    this.add.text(300, 800, 'Press `X` to start', { fontSize: '2.25rem', fill: '#0f0' });
    this.input.keyboard.on('keydown_X', function (event) {
      this.scene.start('game');
    }, this);
  }

  update() {
  }
}
