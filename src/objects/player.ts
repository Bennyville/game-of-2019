import "phaser"
import {Bullet} from "./bullet";
import {Character} from "./character";
import {Enemy} from "./enemy";

export class Player extends Character {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private jumping: boolean;
    private _pushing: boolean;
    private _bullets: Phaser.GameObjects.Group;
    private fireRate: number;
    private nextShot: number;
    private target?: Enemy;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.x = 400;
        this.y = 575;

        this.fireRate = 5;

        this.nextShot = 0;

        this.jumping = false;
        this._pushing = false;

        this._bullets = this.scene.add.group();

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.fillStyle(0xffffff, 1);
        this.fillRect(0, 0, 20, 20);
        scene.add.existing(this);
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

    handleInput() {
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
        } else if(this.cursors.right!.isDown) {
            this.body.setVelocityX(200);
        } else {
            this.body.setVelocityX(0);
        }
    }

    push(velocityX: number) {
        this.body.setVelocityX(velocityX);
        this._pushing = true;
    }

    shoot() {
        if (this.target) {
            let angle = Phaser.Math.Angle.Between(this.x, this.y + (20 / 2), this.target.x, this.target.y + (20 / 2));
            let velocity = this.scene.physics.velocityFromRotation(angle, 10);

            if (this.nextShot < this.scene.time.now || !this.nextShot) {
                let bullet = new Bullet(this.scene, this.x, this.y + (20 / 2), velocity.x, velocity.y);

                this.bullets.add(bullet);

                this.nextShot = this.scene.time.now + (1000 / this.fireRate);
            }
        }
    }

    findTarget(enemies) {
        let closestDistance = -1;
        let closestEnemy;

        // @ts-ignore
        Phaser.Actions.Call(enemies.getChildren(), (enemy: Enemy) => {
            if(enemy.y < this.y + 5 && enemy.y > this.y - 5) {
                let distance = Math.hypot(this.x - enemy.x, this.y - enemy.y);

                if (closestDistance === -1 || closestDistance > distance) {
                    closestDistance = distance;
                    closestEnemy = enemy;
                }
            }
        }, null);

        this.target = closestEnemy;
    }
}

