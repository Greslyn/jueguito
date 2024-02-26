class Personaje extends Phaser.Physics.Arcade.Sprite{

    constructor(scene,x,y,key){
        super(scene,x,y,key)

        scene.add.existing(this)
        scene.physics.add.existing(this, false);

        this.controls = scene.input.keyboard.createCursorKeys();

        for(let key of ["w", "a", "s", "d", "r", "shift", "space", "enter", "esc"]) {
            this.controls[key] = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes[key.toUpperCase()]);
        }

        this.velocity = 100;
        this.lookingAt ="";
    }

    update(){
        this.movement();
        this.actionbomb();
    }


    movement(){
        this.setVelocityX(0);
        this.setVelocityY(0);
        const {a, d, w, s, left, right, up, down}= this.controls;
        if(left.isDown  ^a.isDown){
            this.setVelocityX(-this.velocity)
            this.play(this.animationNames["Leftwalk"], true)
            this.lookingAt ="left";
        }else if(right.isDown  ^d.isDown){
            this.setVelocityX(this.velocity)
            this.play(this.animationNames["Rightwalk"], true)
            this.lookingAt ="right";
        }
        if(up.isDown ^w.isDown){
            this.setVelocityY(-this.velocity)
            this.play(this.animationNames["Upwalk"], true)
            this.lookingAt ="up";
        }
        else if(down.isDown ^s.isDown){
            this.setVelocityY(this.velocity)
            this.play(this.animationNames["Downwalk"], true)
            this.lookingAt ="down";
        }
        
    }

    
    actionbomb(){
        
        const {space}= this.controls;
        if(space.isDown){
            let bombsize = 64;
            let bombplacement = {
                x: this.x,
                y: this.y
            }
            switch (this.lookingAt) {
                case "left":
                    bombplacement.x -= bombsize;
                    break;
                case "right":
                    bombplacement.x += bombsize;
                    break;

                case "up":
                    bombplacement.y -= bombsize;
                    break;

                case "down":
                    bombplacement.y += bombsize;
                    break;
            
                default:
                    break;
            }
            let bomba = this.scene.physics.add.image(bombplacement.x,bombplacement.y,"bombastic1").setCircle(26);
           
            
            if(this.scene.physics.overlap(bomba,this)){
                console.log("in range of explosion");
            } 
        }

    }

    explodebomb(){

    }
    createAnimation(animationNames){
        this.animationNames = {};
        for(let name of animationNames){
            this.animationNames[name] =  "player_"+ name;
            this.scene.anims.create({
                key: "player_"+ name,
                frames: this.scene.anims.generateFrameNames("playeranimations", {
                    start: 0,
                    end: 1,
                    prefix: "player_"+ name + "_",
                }),
                frameRate: 15,
            });

        }
    }


}