import "phaser"
import {Character} from "./character";

export class Enemy extends Character {
    private xSteps: number;
    private xStep: number;
    private xV: integer;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.x = Phaser.Math.Between(0, 800);

        this.fillStyle(0xff0000, 1);
        this.fillRect(0, 0, 20, 20);
        scene.add.existing(this);
    }

    move() {
        if (this.xSteps === 0) {
            this.xV = Phaser.Math.Between(0, 2);

            this.xSteps = Phaser.Math.Between(0, 100);
        }

        if (this.xStep < this.xSteps) {
            switch (this.xV) {
                case 0:
                    this.x += 1.5;
                    break;
                case 1:
                    this.x -= 1.5;
                    break;
                case 2:
                    break;
            }

            this.xStep++;
        } else {
            this.xStep = 0;
            this.xSteps = 0;
        }
    }
}

