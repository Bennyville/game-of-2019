import "phaser"
import {Player} from "../objects/player";
import {Platform} from "../objects/platform";
import {Enemy} from "../objects/enemy";

export class GameScene extends Phaser.Scene {
    private player: Player;
    private platforms: Phaser.GameObjects.Group;
    private enemies: Phaser.GameObjects.Group;

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init(): void {
    }

    create(): void {
        this.player = new Player(this);

        this.platforms = this.add.group();

        // First stage
        this.platforms.add(new Platform(this, 100, 525, 275, 20));
        this.platforms.add(new Platform(this, 425, 525, 275, 20));

        // Second stage
        this.platforms.add(new Platform(this, 100, 450, 167, 20));
        this.platforms.add(new Platform(this, 317, 450, 167, 20));
        this.platforms.add(new Platform(this, 534, 450, 167, 20));

        // Third stage
        this.platforms.add(new Platform(this, 100, 375, 112.5, 20));
        this.platforms.add(new Platform(this, 262.5, 375, 112.5, 20));
        this.platforms.add(new Platform(this, 425, 375, 112.5, 20));
        this.platforms.add(new Platform(this, 587.5, 375, 112.5, 20));

        this.enemies = this.add.group();
        this.enemies.add(new Enemy(this));
        this.enemies.add(new Enemy(this));
        this.enemies.add(new Enemy(this));

        this.physics.add.collider(this.player, this.platforms);
    }

    update(): void {
        this.player.handleInput();

        Phaser.Actions.Call(this.enemies.getChildren(), (enemy: Enemy) => {
            enemy.move();
        }, null);
    }
}
