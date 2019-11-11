import "phaser"

export class Player extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private position: Phaser.Math.Vector2;
    private velocity: Phaser.Math.Vector2;
    private hp: number;
    private hpBar: Phaser.GameObjects.Graphics;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private _dead: boolean;
    private jumping: boolean;
    private _pushing: boolean;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.position = new Phaser.Math.Vector2({x: 0, y: 0});
        this.velocity = new Phaser.Math.Vector2({x: 0, y: 0});

        this.hp = 100;
        this.hpBar = scene.add.graphics();
        scene.add.existing(this.hpBar);

        this._dead = false;
        this.jumping = false;
        this._pushing = false;

        this.cursors = scene.input.keyboard.createCursorKeys();

        this.fillStyle(0xffffff, 1);
        this.fillRect(this.position.x, this.position.y, 20, 20);
        scene.add.existing(this);

        scene.physics.world.enable(this);
        this.body.setSize(20, 20);
        this.body.collideWorldBounds = true;
    }

    get dead(): boolean {
        return this._dead;
    }

    set dead(value: boolean) {
        this._dead = value;
    }

    get pushing(): boolean {
        return this._pushing;
    }

    set pushing(value: boolean) {
        this._pushing = value;
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

    damage(amount: number) {
        this.hp -= amount;

        if(this.hp <= 0) {
            this._dead = true;
        }
    }

    updateHpBar() {
        this.hpBar.clear();
        this.hpBar.x = this.body.x;
        this.hpBar.y = this.body.y;
        this.hpBar.fillStyle(0x00ff00, 1);
        this.hpBar.fillRect((20 * 1.5 - 20) / -2, -4, 20*1.5 / (100 / this.hp), 3);
    }
}

