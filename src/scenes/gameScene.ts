import "phaser"
import {Player} from "../objects/player";
import {Platform} from "../objects/platform";
import {Enemy} from "../objects/enemy";
import {Bullet} from "../objects/bullet";

export class GameScene extends Phaser.Scene {
    private player!: Player;
    private platforms!: Phaser.GameObjects.Group;
    private enemies!: Phaser.GameObjects.Group;
    private currentLevel: number;
    private texts: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({
            key: "GameScene"
        });

        this.currentLevel = 1;
    }

    init(): void {
        this.anims.create({
            key: 'playerWalking',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 9 }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'enemyWalking',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
            frameRate: 16,
            repeat: -1
        });
    }

    create(): void {
        this.add.tileSprite(400, 300, 800, 600, "background");

        this.texts.push(
            this.add.text(
                10,
                10,
                "Level " + this.currentLevel
            )
        );

        this.player = new Player(this, 0, 0, 'player');

        this.platforms = this.add.group();

        // First stage
        this.platforms.add(new Platform(this, 0, 525, 50, 20));
        this.platforms.add(new Platform(this, 100, 525, 275, 20));
        this.platforms.add(new Platform(this, 425, 525, 275, 20));
        this.platforms.add(new Platform(this, 750, 525, 50, 20));

        // Second stage
        this.platforms.add(new Platform(this, 0, 450, 50, 20));
        this.platforms.add(new Platform(this, 100, 450, 167, 20));
        this.platforms.add(new Platform(this, 317, 450, 167, 20));
        this.platforms.add(new Platform(this, 534, 450, 167, 20));
        this.platforms.add(new Platform(this, 750, 450, 50, 20));

        // Third stage
        this.platforms.add(new Platform(this, 0, 375, 50, 20));
        this.platforms.add(new Platform(this, 100, 375, 112.5, 20));
        this.platforms.add(new Platform(this, 262.5, 375, 112.5, 20));
        this.platforms.add(new Platform(this, 425, 375, 112.5, 20));
        this.platforms.add(new Platform(this, 587.5, 375, 112.5, 20));
        this.platforms.add(new Platform(this, 750, 375, 50, 20));

        // Fourth stage
        this.platforms.add(new Platform(this, 0, 300, 50, 20));
        this.platforms.add(new Platform(this, 100, 300, 167, 20));
        this.platforms.add(new Platform(this, 317, 300, 167, 20));
        this.platforms.add(new Platform(this, 534, 300, 167, 20));
        this.platforms.add(new Platform(this, 750, 300, 50, 20));

        // Fifth stage
        this.platforms.add(new Platform(this, 0, 225, 50, 20));
        this.platforms.add(new Platform(this, 100, 225, 275, 20));
        this.platforms.add(new Platform(this, 425, 225, 275, 20));
        this.platforms.add(new Platform(this, 750, 225, 50, 20));

        this.enemies = this.add.group();

        for(let i = 0; i < this.currentLevel*2; i++) {
            this.enemies.add(new Enemy(this, 0, 0, 'enemy'));
        }

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);
        this.physics.add.overlap(this.player, this.enemies);
    }

    update(): void {
        if(this.enemies.getLength() == 0) {
            this.currentLevel++;
            this.scene.restart();
        }

        if(!this.player.pushing) {
            this.player.update();
        }

        this.player.findTarget(this.enemies);

        this.player.shoot();

        this.physics.add.overlap(this.enemies, this.player.bullets);

        this.physics.world.on('worldbounds', (object) => {
            if(object.gameObject instanceof Bullet) {
                object.gameObject.destroy();
            }

            if(object.gameObject instanceof Enemy) {
                let enemy: Enemy = object.gameObject;

                if(object.blocked.right) {
                    console.log('blocked.right');
                    enemy.xDirection = 1;
                } else if(object.blocked.left) {
                    enemy.xDirection = 0;
                }
            }
        });

        // @ts-ignore
        Phaser.Actions.Call(this.player.bullets.getChildren(), (bullet: Bullet) => {
            bullet.move();
        }, null);

        // @ts-ignore
        Phaser.Actions.Call(this.enemies.getChildren(), (enemy: Enemy) => {
            enemy.update();
            enemy.move(this.player.x, this.player.y);

            enemy.shoot();
            this.physics.add.overlap(enemy.bullets, this.player);

            // @ts-ignore
            this.physics.overlap(enemy.bullets, this.player, (bullet: Bullet, player: Player) => {
                bullet.destroy();
                player.damage(enemy.bulletDamage);
            });

            enemy.updateHpBar();

            // @ts-ignore
            Phaser.Actions.Call(enemy.bullets.getChildren(), (bullet: Bullet) => {
                bullet.move();
            }, null);

            if(enemy.dead) {
                enemy.kill();
            }
        }, null);

        this.player.pushing = false;

        // @ts-ignore
        this.physics.overlap(this.player, this.enemies, (player: Player, enemy: Enemy) => {
            if(player.x < enemy.x) {
                player.push(-3000);
            } else {
                player.push(3000);
            }

            player.damage(4+this.currentLevel);
        });

        this.player.updateWeapon();

        // @ts-ignore
        this.physics.overlap(this.enemies, this.player.bullets, (enemy: Enemy, bullet: Bullet) => {
            bullet.destroy();
            enemy.damage(this.player.bulletDamage);
        });

        // @ts-ignore
        // this.physics.collide(this.enemies, this.platforms, (enemy: Enemy, platform: Platform) => {
        //     if(enemy.patrolling && (enemy.body.velocity.x > 0 && enemy.x + 20 >= platform.x + platform.width) || (enemy.body.velocity.x < 0 && enemy.x <= platform.x)) {
        //         enemy.body.velocity.x *= -1;
        //     }
        // });

        if(this.player.dead) {
            this.scene.stop("GameScene");
            this.scene.start("MainMenuScene");
        }

        this.player.updateHpBar();
    }
}
