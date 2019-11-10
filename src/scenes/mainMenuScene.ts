import "phaser"

export class MainMenuScene extends Phaser.Scene {
    private startKey: Phaser.Input.Keyboard.Key;
    private texts: Phaser.GameObjects.Text[] = [];

    constructor() {
        super({
            key: "MainMenu"
        });
    }

    init(): void {
        this.startKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
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
