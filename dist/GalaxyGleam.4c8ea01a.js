// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"game/Menu.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var background = './game/assets/menu.png';
var menuMusic = './game/audio/mainMenu.mp3';

var Menu = exports.Menu = function (_Phaser$Scene) {
    _inherits(Menu, _Phaser$Scene);

    function Menu() {
        _classCallCheck(this, Menu);

        var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this));

        Phaser.Scene.call(_this, 'menu');
        return _this;
    }

    _createClass(Menu, [{
        key: 'preload',
        value: function preload() {
            this.load.image('background', background);
            this.load.audio('menuMusic', menuMusic);
        }
    }, {
        key: 'create',
        value: function create() {
            this.add.image(640, 360, 'background');

            var music = this.sound.add('menuMusic');
            music.setLoop(true);
            music.play();

            var button = this.add.text(100, 100, "Play");
            button.setInteractive();
            button.on('pointerdown', function () {
                music.stop();
                this.scene.start('game');
            }, this);
        }
    }, {
        key: 'goToGame',
        value: function goToGame() {
            this.scene.start('game');
        }
    }]);

    return Menu;
}(Phaser.Scene);
},{}],"game/FullGame.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var background = './game/assets/menu.png';
var blue = './game/assets/blue.png';
var bigAstroid = './game/assets/bigastr.png';
var meteor = './game/assets/meteor.png';

//Sounds
var transitionSector = './game/audio/tsector1.mp3';
var sector1Music = './game/audio/sector1.mp3';

//Instance variables
var level = 1;
var cursors = void 0;
var player = void 0;

//Enemy instance variables
var asteroids = void 0;
var bigastr = void 0;

//Delay Timings
var delayLv0 = Phaser.Math.Between(15000, 20000);
var delayLv1 = Phaser.Math.Between(2500, 4000);
var delayLv2 = Phaser.Math.Between(1000, 2000);
var delayLv3 = Phaser.Math.Between(750, 1500);

var FullGame = exports.FullGame = function (_Phaser$Scene) {
    _inherits(FullGame, _Phaser$Scene);

    function FullGame() {
        _classCallCheck(this, FullGame);

        var _this = _possibleConstructorReturn(this, (FullGame.__proto__ || Object.getPrototypeOf(FullGame)).call(this));

        Phaser.Scene.call(_this, 'game');
        return _this;
    }

    _createClass(FullGame, [{
        key: 'preload',
        value: function preload() {
            this.load.image('background', background);
            this.load.image('blue', blue);
            this.load.image('meteor', meteor);
            this.load.image('bigastr', bigAstroid);
            this.load.audio('sector1', sector1Music);
            this.load.audio('transitionSector', transitionSector);
        }
    }, {
        key: 'create',
        value: function create() {
            //Background Creation
            this.add.image(640, 360, 'background');

            //Level Init - enemies and music
            var music;
            if (level == 1) {
                var transitionMusic = this.sound.add('transitionSector');
                transitionMusic.play();

                /*music = this.sound.add('sector1');
                music.setLoop(true);
                music.play();*/

                sendingEnemies = this.time.addEvent({ delay: delayLv1, callback: sendAsteroid, callbackScope: this, loop: true });
                sendingBigAstr = this.time.addEvent({ delay: delayLv0, callback: sendbigAstr, callbackScope: this, loop: true });
            } else if (level == 2) {} else {}

            //Create Player and Controls
            player = this.physics.add.image(50, 360, 'meteor');
            cursors = this.input.keyboard.createCursorKeys();

            player.setDamping(true);
            player.setDrag(0.99);
            player.setMaxVelocity(200);
            player.body.collideWorldBounds = true;
            player.body.bounce.set(1);
        }
    }, {
        key: 'update',
        value: function update() {
            if (cursors.up.isDown) {
                this.physics.velocityFromRotation(player.rotation, 200, player.body.acceleration);
            } else {
                player.setAcceleration(0);
            }

            if (cursors.left.isDown) {
                player.setAngularVelocity(-300);
            } else if (cursors.right.isDown) {
                player.setAngularVelocity(300);
            } else {
                player.setAngularVelocity(0);
            }
        }
    }, {
        key: 'sendAsteroid',
        value: function sendAsteroid() {
            asteroids = this.physics.add.group({
                key: 'blue',
                repeat: Phaser.Math.Between(0, 1),
                setXY: { x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250) }
            });

            asteroids.children.iterate(function (child) {
                child.body.velocity.setTo(Phaser.Math.Between(-175, -100), 0);
            });

            this.physics.add.collider(player, asteroids, hitEnemy, null, this);
        }
    }, {
        key: 'sendbigAstr',
        value: function sendbigAstr() {
            bigastr = this.physics.add.group({
                key: 'bigAstr',
                repeat: 0,
                setXY: { x: 1400, y: Phaser.Math.Between(50, 600), stepY: Phaser.Math.Between(75, 250) }
            });

            bigastr.children.iterate(function (child) {
                child.body.velocity.setTo(Phaser.Math.Between(-100, -50), 0);
            });

            this.physics.add.collider(player, asteroids, hitEnemy, null, this);
        }
    }, {
        key: 'hitEnemy',
        value: function hitEnemy() {
            console.log("enemy hit");
            this.physics.pause();

            player.setTint(0xff0000);

            gameOver = true;
        }
    }]);

    return FullGame;
}(Phaser.Scene);
},{}],"index.js":[function(require,module,exports) {
'use strict';

var _Menu = require('./game/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _FullGame = require('./game/FullGame');

var _FullGame2 = _interopRequireDefault(_FullGame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    scene: [_Menu2.default, _FullGame2.default]
};

var game = new Phaser.Game(config);
},{"./game/Menu":"game/Menu.js","./game/FullGame":"game/FullGame.js"}],"../../../.nvm/versions/node/v10.1.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '61892' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.nvm/versions/node/v10.1.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/GalaxyGleam.4c8ea01a.map