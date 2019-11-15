import "phaser"
import {Character} from "./character";

export class Enemy extends Character {
    private xSteps: number;
    private xStep: number;
    private xDirection: integer;
    private _patrolling: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture);

        this.x = Phaser.Math.Between(0, 800);

        this._patrolling = Phaser.Math.RND.pick([true, false]);

        this.xSteps = 0;
        this.xStep = 0;
        this.xDirection = 0;

        this.setScale(2);

        scene.add.existing(this);
    }

    get patrolling(): boolean {
        return this._patrolling;
    }

    set patrolling(value: boolean) {
        this._patrolling = value;
    }

    move() {
        if (this.xSteps === 0) {
            this.xDirection = Phaser.Math.Between(0, 2);

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

            this.patrolling = Phaser.Math.RND.pick([true, false]);
        }

        if (this.xStep < this.xSteps) {
            this.x += this.body.velocity.x;

            this.xStep++;
        } else {
            this.xStep = 0;
            this.xSteps = 0;
        }
    }
}

