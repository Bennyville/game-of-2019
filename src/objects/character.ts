import "phaser";

export class Character extends Phaser.GameObjects.Graphics {
    body!: Phaser.Physics.Arcade.Body; // https://github.com/photonstorm/phaser3-docs/issues/24

    private hp: number;
    private _dead: boolean;
    private hpBar: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene) {
        super(scene);

        this.x = 0;
        this.y = 0;

        this.hp = 100;
        this.hpBar = scene.add.graphics();
        scene.add.existing(this.hpBar);

        this._dead = false;

        this.fillStyle(0xffffff, 1);
        this.fillRect(0, 0, 20, 20);
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

    damage(amount: number) {
        this.hp -= amount;

        if(this.hp <= 0) {
            this.dead = true;
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