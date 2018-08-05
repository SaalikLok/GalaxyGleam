import background from "./assets/menu.png";
import bigAstroid from './assets/bigastr.png';
import medAstr from './assets/smallastr.png';
import meteor from './assets/meteor.png';

//Sounds
import transitionSector from './audio/tsector1.mp3';
import sector1Music from './audio/sector1.mp3';

/**
 * @author       Saalik Lokhandwala <saalik@lytebulb.tech>
 * @copyright    2018 Beboin Bros
 */

/// <reference path="./phaser.d.ts"/>
/// <reference path="./declarations.d.ts"/>

//Instance variables
let level = 1;
let cursors;
let player;
let clock;
let clockstart;

//Enemy instance variables
let asteroids;
let bigastr;

//Delay Timings
var delayLv0 = Phaser.Math.Between(15000, 20000);
var delayLv1 = Phaser.Math.Between(2500, 4000);
var delayLv2 = Phaser.Math.Between(1000, 2000);
var delayLv3 = Phaser.Math.Between(750, 1500);

export class FullGame extends Phaser.Scene{
    private background: Phaser.GameObjects.Image;
    private bigAstr: Phaser.GameObjects.Image;
    private medAstr: Phaser.GameObjects.Image;
    private meteor: Phaser.GameObjects.Image;
    private sector1: Phaser.Sound.BaseSound;
    private transitionSector: Phaser.Sound.BaseSound;

    constructor(){
        super({
            key: "FullGame"
        });
    }

    preload(): void {
        this.load.image('background', background);
        this.load.image('meteor', meteor);
        this.load.image('bigastr', bigAstroid);
        this.load.image('medastr', medAstr);
        this.load.audio('sector1', sector1Music);
        this.load.audio('transitionSector', transitionSector);
    }

    create(): void {
        //set Clock
        clock = new Phaser.Time.Clock(this);
        clockstart = clock.now;
        //Background Creation 
        this.add.image(640, 360, 'background');

        if (level == 1){
        this.transitionSector = this.sound.add('transitionSector');
        //this.transitionSector.play();
        this.sector1 = this.sound.add('sector1', {loop: true});
        this.sector1.play();

            
            const sendingEnemies = this.time.addEvent({ delay: delayLv1, callback: this.sendAsteroid, callbackScope: this, loop: true});
            const sendingBigAstr = this.time.addEvent({ delay: delayLv0, callback: this.sendbigAstr, callbackScope: this, loop: true});
        }
        else if(level == 2){

        }
        else{

        }
        
        //Create Player and Controls
        player = this.physics.add.image(50, 360, 'meteor');
        cursors = this.input.keyboard.createCursorKeys();

        player.setDamping(true);
        player.setDrag(0.99);
        player.setMaxVelocity(200);
        player.body.collideWorldBounds = true;
        player.body.bounce.set(1);
    }

    update(): void{
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

        // clock.update(1, 1);
        // console.log(clock.now - clockstart);

        // if((clock.now - clockstart) == 36){
        //     console.log("starting new song")
        //     this.sector1.play();
        // }
    }

    sendAsteroid(): void{
        asteroids = this.physics.add.group({
            key: 'medastr',
            repeat: Phaser.Math.Between(0, 1),
            setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
        });
    
        asteroids.children.iterate(function(child){
            child.body.velocity.setTo(Phaser.Math.Between(-175, -100), 0);
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
        })
    
        this.physics.add.collider(player, asteroids, this.hitEnemy, null, this);
    
    }
    
    hitEnemy(): void{
        console.log("enemy hit");
        this.physics.pause();
    
        player.setTint(0xff0000);
    
        this.game.destroy(true);
    }
}