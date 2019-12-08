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
        let bestLevel: string | null = localStorage.getItem('bestLevel');
        let bestLevelOutput = 'Your best: 0';

        if(bestLevel !== null) {
            bestLevelOutput = 'Your best: ' + bestLevel;    
        } 

        let bestLevelText = this.add.text(
            0,
            0,
            bestLevelOutput
        );

        bestLevelText.x = this.sys.canvas.width / 2 - bestLevelText.width / 2;
        bestLevelText.y = this.sys.canvas.height / 2 - 10 - bestLevelText.height / 2;

        let startText = this.add.text(
            0,
            0,
            "Press SPACE to start"
        );
        
        startText.x = this.sys.canvas.width / 2 - startText.width / 2;
        startText.y = this.sys.canvas.height / 2 + 10 - startText.height / 2;

        this.texts.push(startText);
        this.texts.push(bestLevelText);
    }

    update(): void {
        if (this.startKey.isDown) {
            this.scene.start("GameScene");
        }
    }
}
