/**
 * @author       Saalik Lokhandwala <saalik@lytebulb.tech>
 * @copyright    2018 Beboin Bros
 */

/// <reference path="./phaser.d.ts"/>
/// <reference path="./declarations.d.ts"/>

import "phaser";
import {Menu} from './game/Menu';
import {FullGame} from './game/FullGame';


const config: GameConfig = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    physics: {
        default: "arcade",
        arcade: {
            fps: 60,
            gravity: { y: 0 },
            //debug: true
        },
    },
    scene: [ Menu, FullGame ]
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig){
        super(config);
    }
} 

window.onload = () => {
    var game = new Game(config);
}
