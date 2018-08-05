const background = './game/assets/menu.png';
const menuMusic = './game/audio/mainMenu.mp3';

export class Menu extends Phaser.Scene{
    constructor(){
        super();
        Phaser.Scene.call(this, 'menu');
    }

    preload(){
        this.load.image('background', background);
        this.load.audio('menuMusic', menuMusic);
    }

    create(){
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
    }

    goToGame() {
        this.scene.start('game');
    }
}