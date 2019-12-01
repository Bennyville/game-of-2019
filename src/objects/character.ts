import "phaser";

export class Character extends Phaser.GameObjects.Sprite {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private _scene: Phaser.Scene;
    private _hp: number;
    private _maxHp: number;
    private _hpBar: Phaser.GameObjects.Group;
    private _hpBarStroke: Phaser.GameObjects.Graphics;
    private _hpBarContent: Phaser.GameObjects.Graphics;
    private _dead: boolean;
    private _touchDamage: number;
    private _bulletDamage: number;
    private _weaponCount: number;
    private _fireRate: number;
    private _bullets: Phaser.GameObjects.Group;
    private _jumping: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture, frame);

        this._scene = scene;

        // hp
        this._hp = 100;
        this._maxHp = 100;
        this._hpBar = this.scene.add.group();
        this._hpBarStroke = this.scene.add.graphics();
        this._hpBarContent = this.scene.add.graphics();
        this.initHpBar();

        // states
        this._dead = false;
        this._jumping = false;

        // damage
        this._touchDamage = 0;
        this._bulletDamage = 10;

        // equipment
        this._weaponCount = 0;
        this._fireRate = 3;
        this._bullets = this.scene.add.group();

        this.initPhysics(20, 32);
        this.scene.add.existing(this);
    }

    private initPhysics(width: number, height: number): void {
        this.scene.physics.world.enable(this);

        this.body.setSize(width, height);
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;
    }

    private initHpBar(): void {
        this.hpBar.add(this._hpBarStroke);
        this.hpBar.add(this._hpBarContent);

        this.hpBarContent.setDepth(1);
        this.hpBarStroke.setDepth(1);

        this.hpBarStroke.lineStyle(1, 0x000000);
        this.hpBarStroke.strokeRect(0, 0, 32, 5);
    }

    public damage(amount: number): void {
        this.hp -= amount;

        if(this.hp <= 0) {
            this.hp = 0;
            this.dead = true;
        }
    }

    public kill(): void {
        this.destroy();

        // @ts-ignore
        Phaser.Actions.Call(this.bullets.getChildren(), (bullet: Bullet) => {
            bullet.destroy();
        }, null);

        // @ts-ignore
        Phaser.Actions.Call(this.hpBar.getChildren(), (hpBarComponent: Phaser.GameObjects.Graphics) => {
            hpBarComponent.destroy();
        }, null);
    }

    public update(): void {
        if(this.body.blocked.down || this.body.touching.down && this.jumping) {
            this.jumping = false;
        }
    }

    public updateHpBar(): void {
        this.hpBarContent.clear();
        this.hpBarContent.fillStyle(0x00ff00, 1);
        this.hpBarContent.fillRect(1, 1, 31 / (this.maxHp / this._hp), 3);

        // @ts-ignore
        Phaser.Actions.Call(this.hpBar.getChildren(), (hpBarComponent: Phaser.GameObjects.Graphics) => {
            hpBarComponent.setX(this.x - (this.width / 2));
            hpBarComponent.setY(this.y-24);
        }, null);
    }

    protected jump() {
        if(!this.jumping) {
            this.body.setVelocityY(-500);
            this.jumping = true;
        }
    }

    public getState() {
        return {
            hp: this.hp,
            maxHp: this.maxHp,
            touchDamage: this.touchDamage,
            bulletDamage: this.bulletDamage,
            weaponCount: this.weaponCount,
            fireRate: this.fireRate,
        }
    }

    public applyState(state) {
        this.hp = state.hp;
        this.maxHp = state.maxHp;
        this.touchDamage = state.touchDamage;
        this.bulletDamage = state.bulletDamage;
        this.weaponCount = state.weaponCount;
        this.fireRate = state.fireRate;
    }

    get hp(): number {
        return this._hp;
    }

    set hp(value: number) {
        this._hp = value;
    }

    get maxHp(): number {
        return this._maxHp;
    }

    set maxHp(value: number) {
        this._maxHp = value;
    }

    get hpBar(): Phaser.GameObjects.Group {
        return this._hpBar;
    }

    set hpBar(value: Phaser.GameObjects.Group) {
        this._hpBar = value;
    }

    get hpBarStroke(): Phaser.GameObjects.Graphics {
        return this._hpBarStroke;
    }

    set hpBarStroke(value: Phaser.GameObjects.Graphics) {
        this._hpBarStroke = value;
    }

    get hpBarContent(): Phaser.GameObjects.Graphics {
        return this._hpBarContent;
    }

    set hpBarContent(value: Phaser.GameObjects.Graphics) {
        this._hpBarContent = value;
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

    get scene(): Phaser.Scene {
        return this._scene;
    }

    set scene(value: Phaser.Scene) {
        this._scene = value;
    }

    get jumping(): boolean {
        return this._jumping;
    }

    set jumping(value: boolean) {
        this._jumping = value;
    }

    get bullets(): Phaser.GameObjects.Group {
        return this._bullets;
    }

    set bullets(value: Phaser.GameObjects.Group) {
        this._bullets = value;
    }

    get fireRate(): number {
        return this._fireRate;
    }

    set fireRate(value: number) {
        this._fireRate = value;
    }
}