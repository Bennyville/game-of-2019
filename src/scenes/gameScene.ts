import "phaser"
import {Player} from "../objects/player";
import {Platform} from "../objects/platform";
import {Enemy} from "../objects/enemy";
import {Bullet} from "../objects/bullet";

export class GameScene extends Phaser.Scene {
    private player!: Player;
    private platforms!: Phaser.GameObjects.Group;
    private enemies!: Phaser.GameObjects.Group;

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init(): void {
        this.anims.create({
            key: 'playerWalking',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 9 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'enemyWalking',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }

    create(): void {
        this.player = new Player(this, 0, 0, 'player');

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

        for(let i = 0; i < 10; i++) {
            this.enemies.add(new Enemy(this, 0, 0, 'enemy'));
        }

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.enemies);
    }

    update(): void {
        if(!this.player.pushing) {
            this.player.handleInput();
        }

        this.player.findTarget(this.enemies);

        this.player.shoot();

        this.physics.add.overlap(this.enemies, this.player.bullets);

        this.physics.world.on('worldbounds', (bullet) => {
            bullet.gameObject.destroy();
        });

        // @ts-ignore
        Phaser.Actions.Call(this.player.bullets.getChildren(), (bullet: Bullet) => {
            bullet.move();
        }, null);

        // @ts-ignore
        Phaser.Actions.Call(this.enemies.getChildren(), (enemy: Enemy) => {
            enemy.move();
            enemy.updateHpBar();

            if(enemy.dead) {
                enemy.kill();
            }
        }, null);

        this.player.pushing = false;

        // @ts-ignore
        this.physics.overlap(this.player, this.enemies, (player: Player, enemy: Enemy) => {
            if(player.x < enemy.x) {
                player.push(-1000);
            } else {
                player.push(1000);
            }

            player.damage(5);
        });

        this.player.updateWeapon();

        // @ts-ignore
        this.physics.overlap(this.enemies, this.player.bullets, (enemy: Enemy, bullet: Bullet) => {
            bullet.destroy();
            enemy.damage(20);
        });

        // @ts-ignore
        this.physics.collide(this.enemies, this.platforms, (enemy: Enemy, platform: Platform) => {
            if(enemy.patrolling && (enemy.body.velocity.x > 0 && enemy.x + 20 >= platform.x + platform.width) || (enemy.body.velocity.x < 0 && enemy.x <= platform.x)) {
                enemy.body.velocity.x *= -1;
            }
        });

        if(this.player.dead) {
            this.scene.stop("GameScene");
            this.scene.start("MainMenuScene");
        }

        this.player.updateHpBar();
    }
}
