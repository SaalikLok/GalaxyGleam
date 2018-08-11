import backgr from "./assets/menu.png";
import menuMusic from "./audio/mainMenu.mp3";
import menuClick from './audio/menuClick.mp3';

export class GameOver extends Phaser.Scene{
    private background: Phaser.GameObjects.Image;

    constructor(){
        super({
            key: "Menu"
        });
    }

    preload(): void{

    }

    create(): void{
        
    }
}