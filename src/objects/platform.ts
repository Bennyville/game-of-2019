import "phaser";

export class Platform extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body;

    constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
        super(scene);

        this.x = x;
        this.y = y;

        this.fillStyle(0xffffff, 1);
        this.fillRect(0, 0, w, h);
        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setSize(w, h);
    }
}