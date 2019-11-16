import "phaser"
import {Character} from "./character";

export class Enemy extends Character {
    private _patrolling: boolean;
    private _xSteps: number;
    private _xStep: number;
    private _xDirection: integer;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, frame?: string) {
        super(scene, x, y, texture);

        // position
        this.setX(Phaser.Math.Between(0, 800));

        // states
        this._patrolling = Phaser.Math.RND.pick([true, false]);

        // movement
        this._xSteps = 0;
        this._xStep = 0;
        this._xDirection = 0;
    }

    public move(): void {
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

    get patrolling(): boolean {
        return this._patrolling;
    }

    set patrolling(value: boolean) {
        this._patrolling = value;
    }
}

