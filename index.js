// import {preload} from './game/preload';
// import {create} from './game/create';

var background = require('./game/assets/white.png');

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

    function preload() {
        this.load.image('background', background);
    }

    function create() {
        this.add.image(640, 360, 'background');
    }
    
    function update(){

    }