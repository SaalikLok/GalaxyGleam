//Assets
var background = require('./game/assets/menu.png');
var blue = require('./game/assets/blue.png');

//Instance variables
var level = 1;
var cursors;
var player;
var asteroids;
var sendEnemies;
var delayLv1 = Phaser.Math.Between(1900, 2500);
var delayLv2 = Phaser.Math.Between(1000, 2000);
var delayLv3 = Phaser.Math.Between(750, 1500);

var Menu = new Phaser.Class({
    Extends: Phaser.Scene,
    
    initialize:
    function Menu(){
        Phaser.Scene.call(this, 'menu');
    },

    preload: function(){
        this.load.image('background', background);
    },

    goToGame: function(){
        this.scene.start('game');
    },

    create: function(){
        this.add.image(640, 360, 'background');
        var button = this.add.text(100, 100, "Play");
        button.setInteractive();
        button.on('pointerdown', function(){
            this.scene.start('game');
        }, this);
    },
});

var FullGame = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize:
    function FullGame(){
        Phaser.Scene.call(this, 'game');
    },

    preload: function(){
        this.load.image('background', background);
        this.load.image('blue', blue);
    },

    create: function(){
        //Background Creation
        this.add.image(640, 360, 'background');
        
        //Enemy Creation
        if (level == 1){
            sendEnemiesLv1 = this.time.addEvent({ delay: delayLv1, callback: sendAsteroid, callbackScope: this, loop: true});
        }
        else if(level == 2){

        }
        else{

        }
        
        //Create Player and Controls
        player = this.physics.add.image(50, 360, 'blue');
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

function hitEnemy(){
    console.log("enemy hit");
    this.physics.pause();

    player.setTint(0xff0000);

    gameOver = true;
}

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
