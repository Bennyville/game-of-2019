import "phaser";
import {MainMenuScene} from "./scenes/mainMenuScene";

const config: Phaser.Types.Core.GameConfig = {
    width: 800,
    height: 600,
    parent: "game-wrapper",
    scene: [MainMenuScene],
    physics: {
        default: "arcade"
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
