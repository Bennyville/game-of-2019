import "phaser"

export class Player extends Phaser.GameObjects.Graphics {
    private position: Phaser.Math.Vector2;
    private velocity: Phaser.Math.Vector2;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.position = new Phaser.Math.Vector2({x: 0, y: 0});

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.fillStyle(0xffffff, 1);
        this.fillRect(0, 0, 20, 20);
        scene.add.existing(this);

        scene.physics.world.enable(this);

        if (this.body instanceof Phaser.Physics.Arcade.Body) {
            this.body.setSize(20, 20);
            this.body.collideWorldBounds = true;
        }
    }

    handleInput() {
        if(this.cursors.down.isDown) {
            this.dodge();
        }

        if(this.cursors.up.isDown) {
            this.jump();
        }

        if(this.cursors.left.isDown) {
            this.moveLeft();
        } else if(this.cursors.right.isDown) {
            this.moveRight();
        }
    }
}

