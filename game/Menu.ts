import { Sound } from "phaser";
import backgr from "./assets/menu.png";
import controls from './assets/controls.png'
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
    private backgr: Phaser.GameObjects.Image;
    private playMusic: Howl;
    private menuClick: Howl;
    private playButton: Phaser.GameObjects.Text;
    private creditsButton: Phaser.GameObjects.Text;
    private controlsButton: Phaser.GameObjects.Text;
    private backButton: Phaser.GameObjects.Text;
    private credit1: Phaser.GameObjects.Text;
    private credit2: Phaser.GameObjects.Text;
    private credit3: Phaser.GameObjects.Text;
    private controls: Phaser.GameObjects.Image;
    private upExplain: Phaser.GameObjects.Text;
    private leftRightExplain: Phaser.GameObjects.Text;
    private fontName: String;
    
    constructor(){
        super({
            key: "Menu"
        });

        this.fontName = "Courier";
    }

    preload(): void {
        this.load.image("background", backgr);
        this.load.image("controls", controls);
        this.load.audio('menuMusic', menuMusic);
        this.load.audio('menuClick', menuClick);
    }

    create(): void {
        this.backgr = this.add.image(640, 360, "background");
        
        this.menuClick = new Howl({
            src: [menuClick],
            volume: 0.5
        });

        this.playMusic = new Howl({
            src:[menuMusic],
            autoplay: true,
            loop: true
        })

        this.createMenu();
    }

    createMenu(): void{
        this.playButton = this.add.text(600, 250, "Play");
        this.playButton.setFontFamily(this.fontName);
        this.playButton.setFontSize(40);
        this.playButton.setInteractive();
        this.playButton.on("pointerdown", function(){
            this.menuClick.play();
            this.playMusic.stop();
            this.scene.start("FullGame");
        }, this);

        this.creditsButton = this.add.text(595, 320, "Credits");
        this.creditsButton.setFontFamily(this.fontName);
        this.creditsButton.setFontSize(25);
        this.creditsButton.setInteractive();
        this.creditsButton.on("pointerdown", function(){
            this.menuClick.play();
            this.cleanMenu();
            this.createCredits();
        }, this);

        this.controlsButton = this.add.text(590, 370, "Controls");
        this.controlsButton.setFontFamily(this.fontName);
        this.controlsButton.setFontSize(25);
        this.controlsButton.setInteractive();
        this.controlsButton.on("pointerdown", function(){
            this.menuClick.play();
            this.cleanMenu();
            this.createControls();
        }, this);

        const copyrightText = this.add.text(510, 30, "Saalik, Kaamil and Nabeel present:");
        copyrightText.setFontFamily(this.fontName);

        const titleText = this.add.text(520, 60, "Galaxy Gleam");
        titleText.setFontFamily(this.fontName);        
        titleText.setFontSize(40);
        //copyrightText.setColor('a4a4a');

        const tagline = this.add.text(425, 120, "Avoid the Asteroids and Light Up the Sky");
        tagline.setFontFamily(this.fontName);        
        tagline.setFontSize(20);
    }

    cleanMenu(): void{
        this.controlsButton.destroy();
        this.creditsButton.destroy();
        this.playButton.destroy();
    }

    createCredits(): void{
        this.backgr.setTint(0x4a4a4a);
        this.credit1 = this.add.text(520, 200, "Sprite Animations and Graphics: \n Kaamil Lokhandwala");
        this.credit1.setFontFamily(this.fontName);        
        this.credit1.setFontSize(18);

        this.credit2 = this.add.text(520, 275, "Sounds and Music (originally composed): \n Nabeel Lokhandwala");
        this.credit2.setFontFamily(this.fontName);        
        this.credit2.setFontSize(18);

        this.credit3 = this.add.text(520, 350, "Developer, Designer: \n Saalik Lokhandwala");
        this.credit3.setFontFamily(this.fontName);        
        this.credit3.setFontSize(18);

        this.backButton = this.add.text(605, 600, "Back");
        this.backButton.setFontFamily(this.fontName);
        this.backButton.setFontSize(25);
        this.backButton.setInteractive();
        this.backButton.on("pointerdown", function(){
            this.menuClick.play();
            this.cleanCredits();
            this.createMenu();
        }, this);
    }

    cleanCredits(): void{
        this.backgr.clearTint();
        this.credit1.destroy();
        this.credit2.destroy();
        this.credit3.destroy();
        this.backButton.destroy();
    }

    createControls(): void{
        this.backgr.setTint(0x4a4a4a);
        this.controls = this.add.image(640, 390, "controls");

        this.upExplain = this.add.text(480, 200, "Press the up arrow to move forward.")
        this.leftRightExplain = this.add.text(500, 550, "Press left or right to rotate.")


        this.backButton = this.add.text(605, 600, "Back");
        this.backButton.setFontFamily(this.fontName);
        this.backButton.setFontSize(25);
        this.backButton.setInteractive();
        this.backButton.on("pointerdown", function(){
            this.menuClick.play();
            this.cleanControls();
            this.createMenu();
        }, this);
    }

    cleanControls(): void{
        this.backgr.clearTint();
        this.upExplain.destroy();
        this.leftRightExplain.destroy();
        this.controls.destroy();
        this.backButton.destroy();
    }
}