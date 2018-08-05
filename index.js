import Menu from './game/Menu';
import FullGame from './game/FullGame';

/*
//Assets
var background = require('./game/assets/menu.png');
var blue = require('./game/assets/blue.png');
var bigAstroid = require('./game/assets/bigastr.png');
var meteor = require('./game/assets/meteor.png');

//Sounds
var menuMusic = require('./game/audio/mainMenu.mp3');
var transitionSector = require('./game/audio/tsector1.mp3');
var sector1Music = require('./game/audio/sector1.mp3');

//Instance variables
var level = 1;
var cursors;
var player;

//Enemy instance variables
var asteroids;
var bigastr;

//Delay Timings
var delayLv0 = Phaser.Math.Between(15000, 20000);
var delayLv1 = Phaser.Math.Between(2500, 4000);
var delayLv2 = Phaser.Math.Between(1000, 2000);
var delayLv3 = Phaser.Math.Between(750, 1500);
*/
/*var Menu = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Menu(){
        Phaser.Scene.call(this, 'menu');
    },

    preload: function(){
        this.load.image('background', background);
        this.load.audio('menuMusic', menuMusic);
    },

    goToGame: function(){
        this.scene.start('game');
    },

    create: function(){
        this.add.image(640, 360, 'background');
        
        var music = this.sound.add('menuMusic');
        music.setLoop(true);
        music.play();

        var button = this.add.text(100, 100, "Play");
        button.setInteractive();
        button.on('pointerdown', function(){
            music.stop();
            this.scene.start('game');
        }, this);
    },
});*/

/*var FullGame = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
    function FullGame(){
        Phaser.Scene.call(this, 'game');
    },

    preload: function(){
        this.load.image('background', background);
        this.load.image('blue', blue);
        this.load.image('meteor', meteor);
        this.load.image('bigastr', bigAstroid);
        this.load.audio('sector1', sector1Music);
        this.load.audio('transitionSector', transitionSector);
    },

    create: function(){
        //Background Creation
        this.add.image(640, 360, 'background');
        
        //Level Init - enemies and music
        var music;
        if (level == 1){
            var transitionMusic = this.sound.add('transitionSector');
            transitionMusic.play();

            /*music = this.sound.add('sector1');
            music.setLoop(true);
            music.play();

            sendingEnemies = this.time.addEvent({ delay: delayLv1, callback: sendAsteroid, callbackScope: this, loop: true});
            sendingBigAstr = this.time.addEvent({ delay: delayLv0, callback: sendbigAstr, callbackScope: this, loop: true});
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
    },

    update: function(){
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
});

function sendAsteroid(){
    asteroids = this.physics.add.group({
        key: 'blue',
        repeat: Phaser.Math.Between(0, 1),
        setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
    });

    asteroids.children.iterate(function(child){
        child.body.velocity.setTo(Phaser.Math.Between(-175, -100), 0);
    })

    this.physics.add.collider(player, asteroids, hitEnemy, null, this);
}

function sendbigAstr(){
    bigastr = this.physics.add.group({
        key: 'bigAstr',
        repeat: 0,
        setXY: {x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250)}
    });

    bigastr.children.iterate(function(child){
        child.body.velocity.setTo(Phaser.Math.Between(-100, -50), 0);
    })

    this.physics.add.collider(player, asteroids, hitEnemy, null, this);

}

function hitEnemy(){
    console.log("enemy hit");
    this.physics.pause();

    player.setTint(0xff0000);

    gameOver = true;
}
*/
var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60,
            gravity: { y: 0 }
        }
    },
    scene: [ Menu, FullGame ]
};

var game = new Phaser.Game(config);
