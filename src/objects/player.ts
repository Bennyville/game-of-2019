import "phaser"
import {Bullet} from "./bullet";
import {Character} from "./character";
import {Enemy} from "./enemy";

export class Player extends Character {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _jumping: boolean;
    private _pushing: boolean;
    private _bullets: Phaser.GameObjects.Group;
    private _fireRate: number;
    private _nextShot: number;
    //@ts-ignore
    private _target: Enemy;
    private _weapon: Phaser.GameObjects.Sprite;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture);

        // position
        this.x = 400;
        this.y = 575;

        // equipment
        this._fireRate = 5;
        this._nextShot = 0;
        this._weapon = scene.add.sprite(this.x, this.y, "weapons");
        this._bullets = this.scene.add.group();
        this.initWeapon();

        // states
        this._jumping = false;
        this._pushing = false;

        // input
        this._cursors = scene.input.keyboard.createCursorKeys();
    }

    private initWeapon(): void {
        this.weapon.setFrame(7);

        this.bulletDamage = 20;
        this.weaponCount = 1;
    }

    public handleInput(): void {
        if(this.body.blocked.down || this.body.touching.down && this.jumping) {
            this.jumping = false;
        }

        if(this.cursors.down!.isDown) {
            // this.dodge();
        }

        if(this.cursors.up!.isDown) {
            if(!this.jumping) {
                this.body.setVelocityY(-500);
                this.jumping = true;
            }
        }

        if(this.cursors.left!.isDown) {
            this.body.setVelocityX(-200);
            this.anims.play('playerWalking', true);
            this.setFlipX(true);
            this.weapon.setFlipX(true);
            this.weapon.setX(this.x-20);
        } else if(this.cursors.right!.isDown) {
            this.body.setVelocityX(200);
            this.anims.play('playerWalking', true);
            this.setFlipX(false);
            this.weapon.setFlipX(false);
            this.weapon.setX(this.x+15);
        } else {
            this.body.setVelocityX(0);
            this.anims.stop();
        }

        this.weapon.setY(this.y+5);
    }

    public push(velocityX: number): void {
        this.body.setVelocityX(velocityX);
        this.pushing = true;
    }

    public shoot(): void {
        if (this.target && this.weaponCount > 0) {
            let angle = Phaser.Math.Angle.Between(this.x, this.y + 2, this.target.x, this.target.y + 2);
            let velocity = this.scene.physics.velocityFromRotation(angle, 10);

            if (this.nextShot < this.scene.time.now || !this.nextShot) {
                let bullet = new Bullet(this.scene, this.x, this.y - 2, velocity.x, velocity.y);

                this.bullets.add(bullet);

                this.nextShot = this.scene.time.now + (1000 / this.fireRate);
            }
        }
    }

    public findTarget(enemies): void {
        let closestDistance = -1;
        let closestEnemy;

        // @ts-ignore
        Phaser.Actions.Call(enemies.getChildren(), (enemy: Enemy) => {
            if(enemy.y < this.y + 15 && enemy.y > this.y - 15) {
                let distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);

                if (closestDistance === -1 || closestDistance > distance) {
                    closestDistance = distance;
                    closestEnemy = enemy;
                }
            }
        }, null);

        this.target = closestEnemy;
    }

    get cursors(): Phaser.Types.Input.Keyboard.CursorKeys {
        return this._cursors;
    }

    set cursors(value: Phaser.Types.Input.Keyboard.CursorKeys) {
        this._cursors = value;
    }

    get jumping(): boolean {
        return this._jumping;
    }

    set jumping(value: boolean) {
        this._jumping = value;
    }

    get fireRate(): number {
        return this._fireRate;
    }

    set fireRate(value: number) {
        this._fireRate = value;
    }

    get nextShot(): number {
        return this._nextShot;
    }

    set nextShot(value: number) {
        this._nextShot = value;
    }

    get target(): Enemy {
        return this._target;
    }

    set target(value: Enemy) {
        this._target = value;
    }

    get weapon(): Phaser.GameObjects.Sprite {
        return this._weapon;
    }

    set weapon(value: Phaser.GameObjects.Sprite) {
        this._weapon = value;
    }

    get pushing(): boolean {
        return this._pushing;
    }

    set pushing(value: boolean) {
        this._pushing = value;
    }

    get bullets(): Phaser.GameObjects.Group {
        return this._bullets;
    }

    set bullets(value: Phaser.GameObjects.Group) {
        this._bullets = value;
    }
}

