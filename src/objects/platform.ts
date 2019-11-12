import "phaser";

export class Platform extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body;

    private _width: number;
    private height: number;

    constructor(scene: Phaser.Scene, x: number, y: number, w: number, h: number) {
        super(scene);

        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

        this.fillStyle(0xffffff, 1);
        this.fillRect(0, 0, w, h);
        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setSize(w, h);
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }
}