import "phaser"

export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootScene"
        });
    }

    preload(): void {
        this.load.spritesheet("player", "../src/assets/player.png", {frameHeight: 17, frameWidth: 16});
        this.load.spritesheet("enemy", "../src/assets/enemies.png", {frameHeight: 17, frameWidth: 16});
        this.load.spritesheet("weapons", "../src/assets/weapons.png", {frameHeight: 16, frameWidth: 24});
        this.load.image("background", "../src/assets/background.png");
    }

    update(): void {
        this.scene.start("MainMenuScene");
    }
}
