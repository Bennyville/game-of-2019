import "phaser"

export class Enemy extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private position: Phaser.Math.Vector2;
    private velocity: Phaser.Math.Vector2;
    private jumping: boolean;
    private xSteps: number;
    private xStep: number;
    private xV: integer;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.position = new Phaser.Math.Vector2({x: 0, y: 0});

        this.jumping = false;

        this.fillStyle(0xff0000, 1);
        this.fillRect(this.position.x, this.position.y, 20, 20);
        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setSize(20, 20);
        this.body.collideWorldBounds = true;
    }

    move() {
        if (this.xSteps === 0) {
            this.xV = Phaser.Math.Between(0, 2);

            this.xSteps = Phaser.Math.Between(0, 100);
        }

        if (this.xStep < this.xSteps) {
            switch (this.xV) {
                case 0:
                    this.x += 2;
                    break;
                case 1:
                    this.x -= 2;
                    break;
                case 2:
                    break;
            }

            this.xStep++;
        } else {
            this.xStep = 0;
            this.xSteps = 0;
        }
    }
}

