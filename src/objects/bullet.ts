import "phaser";

export class Bullet extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private _vx: number;
    private _vy: number;
    private _radius: number;
    private _color: number;

    constructor(scene: Phaser.Scene, x: number, y: number, vx: number, vy: number) {
        super(scene);

        // position
        this.x = x;
        this.y = y;

        // movement
        this._vx = vx;
        this._vy = vy;

        // visuals
        this._radius = 3;
        this._color = 0xffffff;

        this.initBullet();
        this.initPhysics();
    }

    private initPhysics(): void {
        this.scene.physics.world.enable(this);
        this.body.setSize(this.radius * 2, this.radius * 2);
        this.body.setCollideWorldBounds(true);
        this.body.onWorldBounds = true;
        this.body.setAllowGravity(false);
    }

    private initBullet(): void {
        this.scene.add.existing(this);
        this.fillStyle(this.color, 1);
        this.fillCircle(this.radius, this.radius, this.radius);
    }

    move(): void {
        this.setX(this.x + this.vx);
        this.setY(this.y + this.vy);
    }

    get radius(): number {
        return this._radius;
    }

    set radius(value: number) {
        this._radius = value;
    }

    get color(): number {
        return this._color;
    }

    set color(value: number) {
        this._color = value;
    }

    get vx(): number {
        return this._vx;
    }

    set vx(value: number) {
        this._vx = value;
    }

    get vy(): number {
        return this._vy;
    }

    set vy(value: number) {
        this._vy = value;
    }
}