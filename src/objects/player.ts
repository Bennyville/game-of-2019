import "phaser"

export class Player extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private position: Phaser.Math.Vector2;
    private velocity: Phaser.Math.Vector2;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private jumping: boolean;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.position = new Phaser.Math.Vector2({x: 0, y: 0});
        this.velocity = new Phaser.Math.Vector2({x: 0, y: 0});

        this.jumping = false;

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.fillStyle(0xffffff, 1);
        this.fillRect(this.position.x, this.position.y, 20, 20);
        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setSize(20, 20);
        this.body.collideWorldBounds = true;
    }

    handleInput() {
        if(this.body.blocked.down && this.jumping) {
            this.jumping = false;
        }


        if(this.cursors.down.isDown) {
            // this.dodge();
        }

        if(this.cursors.up.isDown) {
            if(!this.jumping) {
                this.body.setVelocityY(-500);
                this.jumping = true;
            }
        }

        if(this.cursors.left.isDown) {
            this.body.setVelocityX(-100);
        } else if(this.cursors.right.isDown) {
            this.body.setVelocityX(100);
        } else {
            this.body.setVelocityX(0);
        }
    }
}

