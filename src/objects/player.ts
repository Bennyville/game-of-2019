import "phaser"
import {Bullet} from "./bullet";
import {Character} from "./character";
import {Enemy} from "./enemy";

export class Player extends Character {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private _cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _pushing: boolean;
    private _nextShot: number;
    //@ts-ignore
    private _target: Enemy;
    private _weapon: Phaser.GameObjects.Sprite;
    private _direction: string;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture);

        // position
        this.x = 400;
        this.y = 575;

        // equipment
        this._nextShot = 0;
        this._weapon = scene.add.sprite(this.x+10, this.y+15, "weapons");
        this.initWeapon();

        // states
        this._pushing = false;
        this._direction = "right";

        // input
        this._cursors = scene.input.keyboard.createCursorKeys();

        this.initEvents();
    }

    private initWeapon(): void {
        this.weapon.setFrame(3);
        this.weapon.setDepth(1);

        this.bulletDamage = 20;
        this.weaponCount = 1;
    }

    private initEvents(): void {
        this.on('animationrepeat', () => {
            if(this.anims.currentAnim.key == 'playerWalking' && this.body.blocked.down || this.body.touching.down) {
                this.scene.sound.play("step");
            }
        });
    }

    public handleInput(): void {
        if(this.cursors.down!.isDown) {
            // this.dodge();
        }

        if(this.cursors.up!.isDown) {
            this.jump();
        }

        if(this.cursors.left!.isDown) {
            this.body.setVelocityX(-200);
            this.anims.play('playerWalking', true);
            this.setFlipX(true);
            this.direction = 'left';
        } else if(this.cursors.right!.isDown) {
            this.body.setVelocityX(200);
            this.anims.play('playerWalking', true);
            this.setFlipX(false);
            this.direction = 'right';
        } else {
            this.body.setVelocityX(0);
            this.anims.stop();
        }
    }

    public applyUpgrade(upgrade): void {
        switch(upgrade) {
            case 'firerate':
                this.fireRate += 1;
                break;
            case 'healing':
                this.hp += 50;

                if(this.hp > this.maxHp) {
                    this.hp = this.maxHp;
                }
                break;
            case 'moreHp':
                this.maxHp += 25;
                this.hp += 25;
                break;
            case 'damage':
                this.bulletDamage += 2;
                break;
            default:
                break;
        }
    }

    public update(): void {
        super.update();

        this.handleInput();
    }

    public updateWeapon(): void {
        if(this.direction == "right") {
            this.weapon.setX(this.x+10);
            this.weapon.setFlipX(false);
        } else {
            this.weapon.setFlipX(true);
            this.weapon.setX(this.x-10);
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
                let bullet = new Bullet(this.scene, this.x, this.y+2, velocity.x, velocity.y);
                bullet.setDepth(0);

                this.bullets.add(bullet);

                this.scene.sound.play("shot");

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
                if(this.direction == "left" && enemy.x < this.x || this.direction == "right" && enemy.x > this.x) {
                    let distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);

                    if (closestDistance === -1 || closestDistance > distance) {
                        closestDistance = distance;
                        closestEnemy = enemy;
                    }
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

    get direction(): string {
        return this._direction;
    }

    set direction(value: string) {
        this._direction = value;
    }
}

