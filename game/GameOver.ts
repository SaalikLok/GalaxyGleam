import back1 from "./assets/load1.png";
import back2 from "./assets/load2.png";
import back3 from "./assets/load3.png";
import back4 from "./assets/load4.png";
import menuMusic from "./audio/mainMenu.mp3";
import menuClick from './audio/menuClick.mp3';

/**
 * @author       Saalik Lokhandwala <saalik@lytebulb.tech>
 * @copyright    2018 Beboin Bros
 */

/// <reference path="./phaser.d.ts"/>
/// <reference path="./declarations.d.ts"/>
/// <reference path="../node_modules/@types/howler/index.d.ts"/>

import "phaser";
import { Constants } from "./Constants";

export class GameOver extends Phaser.Scene{
    private backgr: Phaser.GameObjects.Image;
    private menuClick: Howl;

    constructor(){
        super({
            key: "GameOver"
        });
    }

    preload(): void{
        this.load.image('back1', back1);
        this.load.image('back2', back2);
        this.load.image('back3', back3);
        this.load.image('back4', back4);
    }

    create(): void{
        this.anims.create({
            key: 'stars',
            frames: [
                {key: 'back1'},
                {key: 'back2'},
                {key: 'back3'},
                {key: 'back4'},
                {key: 'back3'},
                {key: 'back2'},
            ],
            repeat: -1,
            frameRate: 2,
        });

        this.menuClick = new Howl({
            src: [menuClick],
            volume: 0.5
        });

        this.backgr = this.add.sprite(640, 360, 'back1').play('stars');

        const title = this.add.text(520, 60, "Game Over");
        title.setFontSize(40);

        if(Constants.score >= 1350){
            const youWin = this.add.text(520, 5, 'YOU WON!!');
            youWin.setFontSize(30);
        }

        this.add.text(570, 150, "Your score:")
        const score = this.add.text(620, 200, Constants.score);
        score.setFontSize(30);

        const playAgain = this.add.text(540, 350, "Play Again"); 
        playAgain.setFontSize(30);
        playAgain.setInteractive();
        playAgain.on("pointerdown", function(){
            this.menuClick.play();
            Constants.score = 0;
            Constants.oldScore = 0;
            Constants.neededScore = 150;
            Constants.levelBarScore = 0;
            Constants.level = 1;
            this.scene.start('FullGame');
        }, this);


        const goToMenu = this.add.text(550, 400, "Main Menu");   
        goToMenu.setFontSize(30);
        goToMenu.setInteractive();
        goToMenu.on("pointerdown", function(){
            this.menuClick.play();
            Constants.score = 0;
            Constants.oldScore = 0;
            Constants.neededScore = 150;
            Constants.levelBarScore = 0;
            Constants.level = 1;
            this.scene.start('Menu');
        }, this); 
    }
}