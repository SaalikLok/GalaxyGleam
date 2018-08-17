import load1 from './assets/load1.png';
import load2 from './assets/load2.png';
import load3 from './assets/load3.png';
import load4 from './assets/load4.png';
import background1 from "./assets/background1.png";
import background2 from "./assets/background2.png";
import background3 from "./assets/background3.png";
import transition from './assets/transition.png';
import bigAstroid from './assets/bigastr.png';
import medAstr from './assets/smallastr.png';
import tinyAstr from './assets/tinyastr.png';
import chunkAstr from './assets/chunkastr.png';
import star from './assets/star.png'
import star2 from './assets/star1.png'
import meteor from './assets/meteor.png';
import meteortail1 from './assets/tail.png';
import meteortail2 from './assets/tail2.png';
import meteortail3 from './assets/tail3.png';

//Sounds
import transitionSector from './audio/tsector1.mp3';
import sector1Music from './audio/sector1.mp3';
import sector2Music from './audio/sector2.mp3';
import sector3Music from './audio/sector3.mp3';
import crash from './audio/crash.mp3';
import star1 from './audio/star1.mp3';
import transitionBoom from './audio/TransitionBOOM.mp3';

/**
 * @author       Saalik Lokhandwala <saalik@lytebulb.tech>
 * @copyright    2018 Beboin Bros
 */

/// <reference path="./phaser.d.ts"/>
/// <reference path="./declarations.d.ts"/>
/// <reference path="../node_modules/@types/howler/index.d.ts"/>

import {Constants} from './Constants';
import "phaser";

//Instance variables
let cursors;
let clock;
let clockstart;

//Keys
let spaceKey;

//Enemy instance variables
let asteroidGroup;
let bigastrGroup;
let tinyAstrGroup;
let chunkAstrGroup;
let starSprite;
let sendingStar;
let sendingBigAstr;
let sendingMedAstr;
let sendingChunkAstr;
let sendingTinyAstr;

//Delay Timings
const delayLv0 = Phaser.Math.Between(15000, 20000);
const delayStar = Phaser.Math.Between(10000, 25000);
const delayLv1 = Phaser.Math.Between(2500, 4000);
const delayLv2 = Phaser.Math.Between(1000, 2000);
const delayLv3 = Phaser.Math.Between(750, 1500);

export class FullGame extends Phaser.Scene{
    private background: Phaser.GameObjects.TileSprite;
    private backgroundSpeed: integer;
    private player: Phaser.GameObjects.Sprite;
    private playMusic: Howl;
    private crashSound: Howl;
    private menuClick: Howl;
    private starSound: Howl;
    private transitionBoom: Howl;
    private gameScore: Phaser.GameObjects.Text;
    private levelBar: Phaser.GameObjects.Graphics;
    private transitionMessage: Phaser.GameObjects.Text;

    constructor(){
        super({
            key: "FullGame"
        });
    }

    preload(): void {
        const progress = this.add.graphics();
        
        this.load.on('progress', (val) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(140, 270, 1000 * val, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
        });

        //graphics
        this.load.image('background1', background1);
        this.load.image('background2', background2);
        this.load.image('background3', background3);
        this.load.image('transition', transition);
        this.load.image('meteor', meteor);
        this.load.image('bigastr', bigAstroid);
        this.load.image('medastr', medAstr);
        this.load.image('tinyAstr', tinyAstr);
        this.load.image('chunkAstr', chunkAstr);
        this.load.image('starSprite', star);
        this.load.image('starSprite2', star);
        this.load.image('meteortail1', meteortail1);
        this.load.image('meteortail2', meteortail2);
        this.load.image('meteortail3', meteortail3);

        //audio
        this.load.audio('sector1', sector1Music);
        this.load.audio('sector2', sector2Music);
        this.load.audio('sector3', sector3Music);
        this.load.audio('transitionSector', transitionSector);
        this.load.audio('crash', crash);
        this.load.audio('star1', star1);
        this.load.audio('transitionBoom', transitionBoom);
    }

    create(): void {
        //Keys Created
        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Init Soundfx
        this.crashSound = new Howl({
            src: [crash],
            volume: 2
        });

        this.starSound = new Howl({
            src: [star1],
            volume: 1
        });

        this.transitionBoom = new Howl({
            src: [transitionBoom],
            volume: 1
        });
        this.time.addEvent({loop: true, delay: 2000, callback: this.addTimeScore, callbackScope: this});
        cursors = this.input.keyboard.createCursorKeys();

        this.setStage();

    }

    update(): void{
        this.background.tilePositionX = this.background.tilePositionX + this.backgroundSpeed;

        // Updating the level bar
        if(Constants.score < Constants.neededScore){
            Constants.levelBarScore = Constants.score/Constants.neededScore;
            this.levelBar.fillRect(16, 25, Constants.levelBarScore*200, 20);
        }
        else{
            Constants.score = Constants.neededScore;
            this.transitionMessage.setVisible(true);
            this.levelBar.fillRect(16, 25, 200, 20); 
            this.levelBar.fillStyle(0xF8E71C);

            //If the level bar is full, allow the transition to be activated.
            if(spaceKey.isDown){
                this.handleTransition();
            }   
        }
        this.gameScore.setText("Score: " + Constants.score);

        // Control the player with cursor keys
        if (cursors.up.isDown){
            this.physics.velocityFromRotation(this.player.rotation, 200, this.player.body.acceleration);
        }
        else{
            this.player.setAcceleration(0);
        }

        if (cursors.left.isDown){
            this.player.setAngularVelocity(-300);
        }
        else if (cursors.right.isDown){
            this.player.setAngularVelocity(300);
        }
        else{
            this.player.setAngularVelocity(0);
        }
    }

    // Sets the world based on what level the player is on.
    setStage(): void{
        if (Constants.level == 1){
            
            //Set background
            this.background = this.add.tileSprite(640, 360, 1280, 720, 'background1');
            //Add Score Text
            this.backgroundSpeed = 5;
            this.gameScore = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff', fontFamily: 'Courier' });
            this.levelBar = this.add.graphics({ x: 3, y: 28 });
            this.levelBar.fillStyle(0xffffff, 0.85);
            this.transitionMessage = this.add.text(16, 80, 'Press <Space> to get to the new world!', { fontSize: '12px', fill: '#F8E71C', fontFamily: 'Courier' });
            this.transitionMessage.setVisible(false);
            
            
            //Create Player and Controls
            this.player = this.physics.add.sprite(50, 360, 'meteor');

            this.player.setCircle(35, 0, 2);
            this.player.setDamping(true);
            this.player.setDrag(0.99);
            this.player.setMaxVelocity(200);
            this.player.body.collideWorldBounds = true;
            this.player.body.bounce.set(1);
            
            //Set music
            this.playMusic = new Howl({
                src:[transitionSector],
                autoplay: true,
                volume: 1.3,
                onend: () => {
                    this.playMusic = new Howl({
                        src:[sector1Music],
                        loop: true,
                        autoplay: true,
                        volume: 1.3
                    })
                }
            });

            //Set enemies and items
            sendingStar = this.time.addEvent({ delay: delayStar, callback: this.sendStar, callbackScope: this, loop: true});
            sendingMedAstr = this.time.addEvent({ delay: delayLv1, callback: this.sendAsteroid, callbackScope: this, loop: true});
            sendingBigAstr = this.time.addEvent({ delay: delayLv0, callback: this.sendbigAstr, callbackScope: this, loop: true});
        }
        else if(Constants.level == 2){
            this.physics.resume();
            //Set background
            this.background = this.add.tileSprite(640, 360, 1280, 720, 'background2');
            this.backgroundSpeed = 5;
            
            this.gameScore = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff', fontFamily: 'Courier' });
            this.levelBar = this.add.graphics({ x: 3, y: 28 });
            this.levelBar.fillStyle(0xffffff, 0.85);
            this.transitionMessage = this.add.text(16, 80, 'Press <Space> to get to the new world!', { fontSize: '12px', fill: '#F8E71C', fontFamily: 'Courier' });
            this.transitionMessage.setVisible(false);
            this.player = "";
            this.player = this.physics.add.sprite(50, 360, 'meteor');

            this.player.setCircle(35, 0, 2);
            this.player.setDamping(true);
            this.player.setDrag(0.99);
            this.player.setMaxVelocity(200);
            this.player.body.collideWorldBounds = true;
            this.player.body.bounce.set(1);

            //Set music
            this.playMusic = new Howl({
                src:[sector2Music],
                loop: true,
                autoplay: true
            })

            sendingStar = this.time.addEvent({ delay: delayStar, callback: this.sendStar, callbackScope: this, loop: true});
            sendingMedAstr = this.time.addEvent({ delay: delayLv1, callback: this.sendAsteroid, callbackScope: this, loop: true});
            sendingChunkAstr = this.time.addEvent({ delay: delayLv0, callback: this.sendChunkAstr, callbackScope: this, loop: true});
            sendingBigAstr = this.time.addEvent({ delay: delayLv0, callback: this.sendbigAstr, callbackScope: this, loop: true});
        }
        else{
            this.physics.resume();
            this.background = this.add.tileSprite(640, 360, 1280, 720, 'background3');
            this.backgroundSpeed = 5;
            
            this.gameScore = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff', fontFamily: 'Courier' });
            this.levelBar = this.add.graphics({ x: 3, y: 28 });
            this.levelBar.fillStyle(0xffffff, 0.85);
            this.transitionMessage = this.add.text(16, 80, 'Press <Space> to get to the new world!', { fontSize: '12px', fill: '#F8E71C', fontFamily: 'Courier' });
            this.transitionMessage.setVisible(false);

            this.player = this.physics.add.sprite(50, 360, 'meteor');

            this.player.setCircle(35, 0, 2);
            this.player.setDamping(true);
            this.player.setDrag(0.99);
            this.player.setMaxVelocity(200);
            this.player.body.collideWorldBounds = true;
            this.player.body.bounce.set(1);

            //Set music
            this.playMusic = new Howl({
                src:[sector3Music],
                loop: true,
                autoplay: true
            })

            sendingStar = this.time.addEvent({ delay: delayStar, callback: this.sendStar, callbackScope: this, loop: true});
            sendingMedAstr = this.time.addEvent({ delay: delayLv1, callback: this.sendAsteroid, callbackScope: this, loop: true});
            sendingChunkAstr = this.time.addEvent({ delay: delayLv0, callback: this.sendChunkAstr, callbackScope: this, loop: true});
            sendingBigAstr = this.time.addEvent({ delay: delayLv0, callback: this.sendbigAstr, callbackScope: this, loop: true});
            sendingTinyAstr = this.time.addEvent({ delay: delayLv2, callback: this.sendTinyAstr, callbackScope: this, loop: true});
        }
    }

    sendAsteroid(): void{
        asteroidGroup = this.physics.add.group({
            key: 'medastr',
            repeat: Phaser.Math.Between(0, 1),
            setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
        });
    
        asteroidGroup.children.iterate(function(child){
            child.body.velocity.setTo(Phaser.Math.Between(-175, -100), 0);
            child.body.setAngularVelocity(Phaser.Math.Between(0, 150));
            child.body.setCircle(35, 10, 11);
        });
    
        this.physics.add.collider(this.player, asteroidGroup, this.hitEnemy, null, this);
    }
    
    sendbigAstr(): void{
        bigastrGroup = this.physics.add.group({
            key: 'bigastr',
            repeat: 0,
            setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
        });
    
        bigastrGroup.children.iterate(function(child){
            child.body.velocity.setTo(Phaser.Math.Between(-100, -50), 0);
            child.body.setAngularVelocity(Phaser.Math.Between(0, 20));
            child.body.setCircle(95, 10, 25)
        });
    
        this.physics.add.collider(this.player, bigastrGroup, this.hitEnemy, null, this);
    
    }

    sendChunkAstr(): void{
        chunkAstrGroup = this.physics.add.group({
            key: 'chunkAstr',
            repeat: 0,
            setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
        });
    
        chunkAstrGroup.children.iterate(function(child){
            child.body.velocity.setTo(Phaser.Math.Between(-175, -150), 0);
            child.body.setAngularVelocity(Phaser.Math.Between(0, 100));
            child.body.setCircle(35, 10, 12)
        });
    
        this.physics.add.collider(this.player, chunkAstrGroup, this.hitEnemy, null, this);
    }

    sendTinyAstr(): void{
        tinyAstrGroup = this.physics.add.group({
            key: 'tinyAstr',
            repeat: 0,
            setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
        });
    
        tinyAstrGroup.children.iterate(function(child){
            child.body.velocity.setTo(Phaser.Math.Between(-250, -175), 0);
            child.body.setAngularVelocity(Phaser.Math.Between(80, 150));
            child.body.setCircle(18, 10, 12)
        });
    
        this.physics.add.collider(this.player, tinyAstrGroup, this.hitEnemy, null, this);
    }

    sendStar(): void{
        starSprite = this.physics.add.sprite(1400, Phaser.Math.Between(50, 600), 'starSprite');

        starSprite.body.velocity.setTo(-100, 0);
        starSprite.body.setAngularVelocity(Phaser.Math.Between(0, 5));
        starSprite.body.bounce.set(0);

        this.physics.add.overlap(this.player, starSprite, this.addStarScore, null, this);
        this.physics.add.collider(starSprite, bigastrGroup);
        this.physics.add.collider(starSprite, asteroidGroup);
        this.physics.add.collider(starSprite, tinyAstrGroup);
        this.physics.add.collider(starSprite, chunkAstrGroup);
    }

    addStarScore(player, star): void{
        star.disableBody(true, true);
        this.starSound.play();
        Constants.score = Constants.score + 50;
    }
    
    hitEnemy(): void{
        console.log("enemy hit");
        this.crashSound.play();
        this.physics.pause();
    
        this.playMusic.stop();
        this.player.setTint(0xff0000);

        setTimeout(() => {
            this.scene.start('GameOver');   
        }, 1000);
    }

    addTimeScore(): void{
        Constants.score++;
    }

    handleTransition(): void{
        if(Constants.level < 3){
            this.physics.pause();    
            bigastrGroup.clear(true, true);
            starSprite.destroy();
            asteroidGroup.clear(true, true);
    
            if(tinyAstrGroup){
                tinyAstrGroup.clear(true, true);
            }
    
            if(chunkAstrGroup){
                chunkAstrGroup.clear(true, true);
            }
    
            if(sendingChunkAstr){
                sendingChunkAstr = "";
            }
    
            if(sendingTinyAstr){
                sendingTinyAstr = "";
            }
    
            sendingBigAstr = "";
            sendingMedAstr = "";
            sendingStar = "";
    
            this.playMusic.stop();
            Constants.level++;
            Constants.oldScore = Constants.neededScore;
            Constants.neededScore = Constants.neededScore * 3;
            Constants.levelBarScore = 0;
            this.background.destroy();
            this.playTransition();
        }
        else{
            this.scene.start('GameOver');
        }
    }

    playTransition(): void{
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'transition');

        this.backgroundSpeed = 50;
        this.transitionBoom.play();

        setTimeout(() => {
            this.transitionBoom.stop();
            this.background.destroy();
            this.player.destroy(); 
            Constants.score = Constants.oldScore;
            this.setStage();
        }, 10000)
    }
}