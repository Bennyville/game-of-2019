import "phaser";

export class Character extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    protected hp: number;
    protected _dead: boolean;
    protected hpBar: Phaser.GameObjects.Graphics;
    protected _bulletDamage: number;
    protected _touchDamage: number;
    protected _weaponCount: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture, frame);

        this.hp = 100;
        this.hpBar = scene.add.graphics();
        scene.add.existing(this.hpBar);

        this._dead = false;

        this._bulletDamage = 0;
        this._touchDamage = 0;
        this._weaponCount = 0;

        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setSize(10, 16);
        this.body.collideWorldBounds = true;
    }

    get bulletDamage(): number {
        return this._bulletDamage;
    }

    set bulletDamage(value: number) {
        this._bulletDamage = value;
    }

    get touchDamage(): number {
        return this._touchDamage;
    }

    set touchDamage(value: number) {
        this._touchDamage = value;
    }

    get weaponCount(): number {
        return this._weaponCount;
    }

    set weaponCount(value: number) {
        this._weaponCount = value;
    }

    get dead(): boolean {
        return this._dead;
    }

    set dead(value: boolean) {
        this._dead = value;
    }

    damage(amount: number) {
        this.hp -= amount;

        if(this.hp <= 0) {
            this.dead = true;
        }
    }

    kill() {
        this.destroy();
        this.hpBar.destroy();
    }

    updateHpBar() {
        this.hpBar.clear();
        this.hpBar.x = this.body.x;
        this.hpBar.y = this.body.y;
        this.hpBar.lineStyle(1, 0x000000);
        this.hpBar.strokeRect((32 - 32) / -2, -4, 32, 5)
        this.hpBar.fillStyle(0x00ff00, 1);
        this.hpBar.fillRect((32 - 32) / -2, -4, 32 / (100 / this.hp), 3);
    }
}