import "phaser";
import {MainMenuScene} from "./scenes/mainMenuScene";
import {GameScene} from "./scenes/gameScene";
import {BootScene} from "./scenes/bootScene";

const config: Phaser.Types.Core.GameConfig = {
    backgroundColor: 0xCCCCCC,
    width: 800,
    height: 608,
    parent: "game-wrapper",
    scene: [BootScene, MainMenuScene, GameScene],
    physics: {
        default: "arcade",
        arcade: {
            tileBias: 32,
            gravity: {
                y: 1250
            },
            debug: false
        }
    },
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

export class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

window.addEventListener("load", () => {
    const game = new Game(config);
});
