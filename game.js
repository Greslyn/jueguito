
var config = {
    width: 1320,
    height: 850,
    backgroundColor: 0x662918,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug:true
        }
    },
    scene: [Scene1,Scene2]
}

var game = new Phaser.Game(config);