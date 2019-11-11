import "phaser"
import {Player} from "../objects/player";

export class GameScene extends Phaser.Scene {
    private player: Player;

    constructor() {
        super({
            key: "GameScene"
        });
    }

    init(): void {
        this.player = new Player(this);
    }

    create(): void {

    }

    update(): void {
        this.player.handleInput();
    }
}
