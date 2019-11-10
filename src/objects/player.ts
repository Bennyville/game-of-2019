import "phaser"

export class Player {
    private position: Phaser.Math.Vector2;
    private velocity: Phaser.Math.Vector2;
    private readonly body: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, position: {x: number, y: number}) {
        this.position = new Phaser.Math.Vector2({x: position.x, y: position.y});

        this.body = scene.add.graphics();
        this.body.fillStyle(0xffffff, 1);
        this.body.fillRect(0, 0, 20, 20);
        scene.add.existing(this.body);

        scene.physics.world.enable(this.body);

        if (this.body.body instanceof Phaser.Physics.Arcade.Body) {
            this.body.body.setSize(20, 20);
            this.body.body.collideWorldBounds = true;
        }
    }
}

