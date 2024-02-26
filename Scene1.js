class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame")
    
}

create() {
    this.add.text(100,100,"Loading game...", {font:"25px Arial", fill: "green"})
    this.scene.start("playGame")
}
}