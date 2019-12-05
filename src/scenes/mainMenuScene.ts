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

    create(): void {
        this.add.tileSprite(400, 300, 800, 600, "background");

        let startText = this.add.text(
            0,
            0,
            "Press SPACE to start"
        );
        
        startText.x = this.sys.canvas.width / 2 - startText.width / 2;
        startText.y = this.sys.canvas.height / 2 - startText.height / 2;

        this.texts.push(startText);
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start("GameScene");
        }
    }
}
