import { Sound } from "phaser";
import backgr from "./assets/menu.png";
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

export class Menu extends Phaser.Scene{
    private background: Phaser.GameObjects.Image;
    private playMusic: Howl;
    private menuClick: Howl;

    constructor(){
        super({
            key: "Menu"
        });
    }

    preload(): void {
        this.load.image("background", backgr);
        this.load.audio('menuMusic', menuMusic);
        this.load.audio('menuClick', menuClick);
    }

    create(): void {
        this.add.image(640, 360, "background");
        
        this.menuClick = new Howl({
            src: [menuClick],
            volume: 0.5
        });

        this.playMusic = new Howl({
            src:[menuMusic],
            autoplay: true,
            loop: true
        })

        var button = this.add.text(100, 100, "Play");
        button.setInteractive();
        button.on("pointerdown", function(){
            this.menuClick.play();
            this.playMusic.stop();
            this.scene.start("FullGame");
        }, this);
    }
}