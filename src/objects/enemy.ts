import "phaser"
import {Character} from "./character";
import {Bullet} from "./bullet";

export class Enemy extends Character {
    private _patrolling: boolean;
    private _chase: boolean;
    private _xSteps: number;
    private _xStep: number;
    private _xDirection: integer;
    private _nextJump: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture);

        // position
        this.setX(Phaser.Math.Between(0, 800));

        // states
        this._patrolling = Phaser.Math.RND.pick([true, false]);
        this._chase = false;

        // movement
        this._xSteps = 0;
        this._xStep = 0;
        this._xDirection = 0;
        this._nextJump = 0;
    }

    public shoot() {
        let bulletVX = 0;

        switch(this.xDirection) {
            case 0:
                bulletVX = 5;
                break;
            case 1:
                bulletVX = -5;
                break;
        }

        if(bulletVX != 0 && Phaser.Math.Between(0, 100) == 100) {
            let bullet = new Bullet(this.scene, this.x, this.y+2, bulletVX, 0);
            bullet.setDepth(0);

            this.bullets.add(bullet);

            // this.scene.sound.play("shot");
        }
    }

    public move(playerX: number, playerY: number): void {
        if (this.xSteps === 0) {
            // this.patrolling = Phaser.Math.RND.pick([true, false]);
            // this.chase = Phaser.Math.RND.pick([true, false]);

            if(this.chase) {
                if(playerY > this.y) {
                    this.xDirection = 0;
                } else {
                    if(playerX > this.x) {
                        this.xDirection = 0;
                    } else {
                        this.xDirection = 1;
                    }
                }

                // subtract a certain number from the opponent's y position so that they do not jump when the player
                // jumps onto a platform and is briefly above the opponent's y position
                if(playerY < this.y - 10 && !this.jumping) {
                    this.jump();
                }
            } else {
                this.xDirection = Phaser.Math.Between(0, 2);
            }

            switch (this.xDirection) {
                case 0:
                    this.body.setVelocityX(1.5);
                    this.anims.play('enemyWalking');
                    this.setFlipX(false);
                    break;
                case 1:
                    this.body.setVelocityX(-1.5);
                    this.anims.play('enemyWalking');
                    this.setFlipX(true);
                    break;
                case 2:
                    this.body.setVelocityX(0);
                    this.anims.stop();
                    break;
            }

            this.xSteps = Phaser.Math.Between(0, 100);
        }

        if (this.xStep < this.xSteps) {
            this.x += this.body.velocity.x;

            if(this.nextJump == 0 || this.nextJump < this.scene.time.now && Phaser.Math.Between(0, 5) == 5 && this.y > 225) {
                this.jump();

                this.nextJump = this.scene.time.now + Phaser.Math.Between(3000, 10000);
            }

            let distance = Math.hypot(this.x - playerX, this.y - playerY);

            if(distance < 400) {
                this.chase = true;
            } else {
                this.chase = false;
            }

            this.xStep++;
        } else {
            this.xStep = 0;
            this.xSteps = 0;
        }
    }

    get xSteps(): number {
        return this._xSteps;
    }

    set xSteps(value: number) {
        this._xSteps = value;
    }

    get xStep(): number {
        return this._xStep;
    }

    set xStep(value: number) {
        this._xStep = value;
    }

    get xDirection(): number {
        return this._xDirection;
    }

    set xDirection(value: number) {
        this._xDirection = value;
    }

    get nextJump(): number {
        return this._nextJump;
    }

    set nextJump(value: number) {
        this._nextJump = value;
    }

    get patrolling(): boolean {
        return this._patrolling;
    }

    set patrolling(value: boolean) {
        this._patrolling = value;
    }

    get chase(): boolean {
        return this._chase;
    }

    set chase(value: boolean) {
        this._chase = value;
    }
}

