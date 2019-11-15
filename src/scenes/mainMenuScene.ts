import "phaser"

export class MainMenuScene extends Phaser.Scene {
    private startKey!: Phaser.Input.Keyboard.Key;
    private texts: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({
            key: "MainMenuScene"
        });
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
    }

    preload(): void {
        this.load.spritesheet("player", "../src/assets/player-walking.png", {frameHeight: 17, frameWidth: 16});
        this.load.spritesheet("enemy", "../src/assets/enemy_set.png", {frameHeight: 17, frameWidth: 16});
        this.load.spritesheet("weapons", "../src/assets/weapons_set.png", {frameHeight: 16, frameWidth: 24});
        this.load.image("background", "../src/assets/background.png");
    }

    create(): void {
        this.texts.push(
            this.add.text(
                this.sys.canvas.width / 2 - 100,
                this.sys.canvas.height / 2 - 10,
                "Press SPACE to start"
            )
        );
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start("GameScene");
        }
    }
}
