import background1 from "./assets/background1.png";
import bigAstroid from './assets/bigastr.png';
import medAstr from './assets/smallastr.png';
import star from './assets/star.png'
import meteor from './assets/meteor.png';

//Sounds
import transitionSector from './audio/tsector1.mp3';
import sector1Music from './audio/sector1.mp3';
import sector2Music from './audio/sector2.mp3';
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
let player;
let clock;
let clockstart;

//Enemy instance variables
let asteroids;
let bigastr;
let starSprite;

//Delay Timings
var delayLv0 = Phaser.Math.Between(15000, 20000);
var delayLv1 = Phaser.Math.Between(2500, 4000);
var delayLv2 = Phaser.Math.Between(1000, 2000);
var delayLv3 = Phaser.Math.Between(750, 1500);

export class FullGame extends Phaser.Scene{
    private background: Phaser.GameObjects.TileSprite;
    private playMusic: Howl;
    private crashSound: Howl;
    private menuClick: Howl;
    private starSound: Howl;
    private transitionBoom: Howl;
    private gameScore: Phaser.GameObjects.Text;

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
            progress.fillRect(140, 270, 1000 * val, 60)
        });

        this.load.on('complete', () => {
            progress.destroy();
        });

        //graphics
        this.load.image('background1', background1);
        this.load.image('meteor', meteor);
        this.load.image('bigastr', bigAstroid);
        this.load.image('medastr', medAstr);
        this.load.image('starSprite', star);

        //audio
        this.load.audio('sector1', sector1Music);
        this.load.audio('sector2', sector2Music);
        this.load.audio('transitionSector', transitionSector);
        this.load.audio('crash', crash);
        this.load.audio('star1', star1);
        this.load.audio('transitionBoom', transitionBoom);
    }

    create(): void {
        //Background Creation 
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background1');

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

        //Add Score Text
        this.gameScore = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#ffffff' });

        if (Constants.level == 1){
            this.playMusic = new Howl({
                src:[transitionSector],
                autoplay: true,
                onend: () => {
                    this.playMusic = new Howl({
                        src:[sector1Music],
                        loop: true,
                        autoplay: true
                    })
                }
            });

            const sendingStar = this.time.addEvent({ delay: delayLv0, callback: this.sendStar, callbackScope: this, loop: true});
            const sendingEnemies = this.time.addEvent({ delay: delayLv1, callback: this.sendAsteroid, callbackScope: this, loop: true});
            const sendingBigAstr = this.time.addEvent({ delay: delayLv0, callback: this.sendbigAstr, callbackScope: this, loop: true});
        }
        else if(Constants.level == 2){
            this.playMusic = new Howl({
                src:[sector2Music],
                loop: true,
                autoplay: true
            })
        }
        else{

        }
        
        //Create Player and Controls
        player = this.physics.add.image(50, 360, 'meteor');
        cursors = this.input.keyboard.createCursorKeys();

        player.setCircle(30, 0, 2);
        player.setDamping(true);
        player.setDrag(0.99);
        player.setMaxVelocity(200);
        player.body.collideWorldBounds = true;
        player.body.bounce.set(1);
        
        this.time.addEvent({loop: true, delay: 2000, callback: this.addTimeScore})
    }

    update(): void{
        this.background.tilePositionX = this.background.tilePositionX + 5;

        this.gameScore.setText("Score: " + Constants.score);

        if (cursors.up.isDown){
            this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
        }
        else{
            player.setAcceleration(0);
        }

        if (cursors.left.isDown){
            player.setAngularVelocity(-300);
        }
        else if (cursors.right.isDown){
            player.setAngularVelocity(300);
        }
        else{
            player.setAngularVelocity(0);
        }

    }

    sendAsteroid(): void{
        asteroids = this.physics.add.group({
            key: 'medastr',
            repeat: Phaser.Math.Between(0, 1),
            setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
        });
    
        asteroids.children.iterate(function(child){
            child.body.velocity.setTo(Phaser.Math.Between(-175, -100), 0);
            child.body.setAngularVelocity(Phaser.Math.Between(0, 150));
            child.body.setCircle(35, 10, 12);
        })
    
        this.physics.add.collider(player, asteroids, this.hitEnemy, null, this);
    }
    
    sendbigAstr(): void{
        bigastr = this.physics.add.group({
            key: 'bigastr',
            repeat: 0,
            setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
        });
    
        bigastr.children.iterate(function(child){
            child.body.velocity.setTo(Phaser.Math.Between(-100, -50), 0);
            child.body.setAngularVelocity(Phaser.Math.Between(0, 20));
            child.body.setCircle(95, 10, 25)
        })
    
        this.physics.add.collider(player, bigastr, this.hitEnemy, null, this);
    
    }

    sendStar(): void{
        starSprite = this.physics.add.group({
            key:'starSprite',
            repeat: 0,
            setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
        })

        starSprite.children.iterate(function(child){
            child.body.velocity.setTo(-100, 0);
            child.body.setAngularVelocity(Phaser.Math.Between(0, 5));
            //child.body.setCircle(95, 10, 25)
        })

        this.physics.add.overlap(player, starSprite, this.addStarScore, null, this);
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
        player.setTint(0xff0000);
    
        //this.game.destroy(true);
    }

    addTimeScore(): void{
        Constants.score++;
    }
}