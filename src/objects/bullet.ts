import "phaser";

export class Bullet extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private radius: number;
    private color: number;
    private vx: number;
    private vy: number;

    constructor(scene: Phaser.Scene, x: number, y: number, vx: number, vy: number) {
        super(scene);

        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.radius = 2;
        this.color = 0xffffff;
        this.scene.add.existing(this);

        this.scene.physics.world.enable(this);
        this.body.setSize(this.radius * 2, this.radius * 2);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setAllowGravity(false);
        this.fillStyle(this.color, 1);
        this.fillCircle(this.radius, this.radius, this.radius);
    }

    move(): void {
        // this.clear();
        this.x += this.vx;
        this.y += this.vy;
        // this.fillStyle(this.color, 1);
        // this.fillCircle(this.radius, this.radius, this.radius);
    }
}