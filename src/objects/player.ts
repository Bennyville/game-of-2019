import "phaser"
import {Bullet} from "./bullet";
import {Character} from "./character";

export class Player extends Character {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private jumping: boolean;
    private _pushing: boolean;
    private _bullets: Phaser.GameObjects.Group;
    private bulletSpeed: number;
    private fireRate: number;
    private nextShot: number;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.fireRate = 5;

        this.jumping = false;
        this._pushing = false;

        this.bullets = this.scene.add.group();

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

        if(this.cursors.down.isDown) {
            // this.dodge();
        }

        if(this.cursors.up.isDown) {
            if(!this.jumping) {
                this.body.setVelocityY(-500);
                this.jumping = true;
            }
        }

        if(this.cursors.left.isDown) {
            this.body.setVelocityX(-200);
        } else if(this.cursors.right.isDown) {
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
        if(this.nextShot < this.scene.time.now || !this.nextShot) {
            let bullet = new Bullet(this.scene, this.x, this.y + (20/2));

            this.bullets.add(bullet);

            this.nextShot = this.scene.time.now + (1000 / this.fireRate);
        }
    }
}

