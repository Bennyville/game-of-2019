import "phaser";

export class Platform extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body;

    private _scene: Phaser.Scene;
    private _width: number;
    private _height: number;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number) {
        super(scene);

        this._scene = scene;

        // dimensions
        this._width = width;
        this._height = height;

        // position
        this.setX(x);
        this.setY(y);

        this.initPlatform();
        this.initPhysics();
    }

    private initPlatform(): void {
        this.fillStyle(0xffffff, 1);
        this.fillRect(0, 0, this.width, this.height);
        this.scene.add.existing(this);
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this);
        this.body.setAllowGravity(false);
        this.body.setImmovable(true);
        this.body.setSize(this.width, this.height);
    }

    get scene(): Phaser.Scene {
        return this._scene;
    }

    set scene(value: Phaser.Scene) {
        this._scene = value;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }
}