import { Sound } from "phaser";
import backgr from "./assets/menu.png";
import menuMusic from "./audio/mainMenu.mp3";

/**
 * @author       Saalik Lokhandwala <saalik@lytebulb.tech>
 * @copyright    2018 Beboin Bros
 */

/// <reference path="./phaser.d.ts"/>
/// <reference path="./declarations.d.ts"/>

export class Menu extends Phaser.Scene{
    private background: Phaser.GameObjects.Image;
    private gameMusic: Phaser.Sound.WebAudioSoundManager;
    private menuMusic: Phaser.Sound.BaseSound;

    constructor(){
        super({
            key: "Menu"
        });
    }

    preload(): void {
        this.load.image("background", backgr);
        this.load.audio('menuMusic', menuMusic);
    }

    create(): void {
        this.add.image(640, 360, "background");
        
        this.menuMusic = this.sound.add("menuMusic", {loop:true});
        this.menuMusic.play();

        var button = this.add.text(100, 100, "Play");
        button.setInteractive();
        button.on("pointerdown", function(){
            this.menuMusic.stop();
            this.scene.start("FullGame");
        }, this);
    }
}