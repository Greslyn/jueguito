class Scene2 extends Phaser.Scene {
    player;
    layer;

    constructor() {
        super("playGame")
    }

    preload() {
        this.load.spritesheet('tiles', 'assets/escenario/dirt.png', {frameWidth: 30, frameHeight: 30});
        //this.load.image('tiles', 'assets/escenario/dirt.png');
        this.load.tilemapTiledJSON('map', 'assets/escenario/tilemap.json');
        this.load.atlas('playeranimations', 'assets/animacion_personaje/sprite.png', "assets/animacion_personaje/sprite_atlas.json");
        this.load.image('personaje_textura','assets/animacion_personaje/sprites_0.png');
        this.load.image('bombastic1','assets/objetos/bomba.png');
    }

 
    create(){
        // load the map
        const map = this.make.tilemap({ key: "map" });
        const tiles = map.addTilesetImage("tile_nivel", "tiles");
       

        // Crear las capas
        const layer1 = map.createLayer("collision", tiles, 30, 30);
        layer1.setCollisionByExclusion([-1]);
        const layer2 = map.createLayer("floor", tiles, 30, 30);
        // colision personaje 
        

        let playerList = ["Downwalk","Upwalk","Leftwalk","Rightwalk"]
        this.player = new Personaje(this,100,620,"personaje_textura")
        // this.player.setScale(2,2)
        this.player.createAnimation(playerList);
        this.physics.add.collider(this.player,layer1)
        console.log(this.player)

    }
    update(){
        this.player.update()
    }
}