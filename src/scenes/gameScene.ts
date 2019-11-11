import "phaser"
import {Player} from "../objects/player";
import {Platform} from "../objects/platform";
import {Enemy} from "../objects/enemy";
import {Bullet} from "../objects/bullet";

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
        this.physics.add.overlap(this.player, this.enemies);
    }

    update(): void {
        if(!this.player.pushing) {
            this.player.handleInput();
        }

        this.player.shoot();

        this.physics.add.collider(this.enemies, this.player.bullets);

        this.physics.world.on('worldbounds', (bullet) => {
            bullet.gameObject.destroy();
        });

        Phaser.Actions.Call(this.player.bullets.getChildren(), (bullet: Bullet) => {
            bullet.move();
        }, null);

        Phaser.Actions.Call(this.enemies.getChildren(), (enemy: Enemy) => {
            enemy.move();
            enemy.updateHpBar();

            if(enemy.dead) {
                enemy.destroy();
            }
        }, null);

        this.player.pushing = false;

        this.physics.overlap(this.player, this.enemies, (player: Player, enemy: Enemy) => {
            if(player.x < enemy.x) {
                player.push(-1000);
            } else {
                player.push(1000);
            }

            player.damage(5);
        });

        this.physics.collide(this.enemies, this.player.bullets, (enemy: Enemy, bullet: Bullet) => {
            bullet.destroy();
            enemy.damage(10);
        });

        if(this.player.dead) {
            this.scene.stop("GameScene");
            this.scene.start("MainMenuScene");
        }

        this.player.updateHpBar();
    }
}
