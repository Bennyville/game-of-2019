import "phaser"

export class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: "BootScene"
        });
    }

    preload(): void {
        this.load.spritesheet("player", "../src/assets/player.png", {frameHeight: 34, frameWidth: 32});
        this.load.spritesheet("enemy", "../src/assets/enemies.png", {frameHeight: 34, frameWidth: 32});
        this.load.spritesheet("weapons", "../src/assets/weapons.png", {frameHeight: 32, frameWidth: 48});
        this.load.image("background", "../src/assets/background.png");
        this.load.image("tiles", "../src/assets/environment.png");
        this.load.audio("step", "../src/assets/110099__ronaldvanwonderen__heavy-footstep.wav");
        this.load.audio("shot", "../src/assets/77340__tcpp__machinegun-ish.wav");
    }

    update(): void {
        this.scene.start("MainMenuScene");
    }
}
