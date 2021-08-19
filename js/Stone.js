class Stone{
    constructor(x,y,r) {
        this.r = r
        this.body = Bodies.circle(x,y,r)
        this.image = loadImage("assets/stone.png")
        World.add(world,this.body)
    }

    display() {
        var pos = this.body.position
        push()
        fill("white")
        image(this.image,pos.x,pos.y,this.r,this.r)
        pop()
    }
} 
