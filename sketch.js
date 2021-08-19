const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var joinPoint, side, side2, bridge, wall1, wall2
var stones = []
var backgroundImg, stoneImg, woodImg, zombieImg, axeImg,link
var zombie
var button

function preload() {
  backgroundImg = loadImage("assets/background.png")
  axeImg = loadImage("assets/axe.png")
  stoneImg = loadImage("assets/stone.png")
  woodImg = loadImage("assets/wood.png")
  zombieImg = loadImage("assets/zombie.png")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;

  wall1 = new Base(0,height/2,30,height)
  wall2 = new Base(width,height/2,30,height)

  side2 = new Base(width-80,height/2.3,width/10,100)
  var sidePos = side2.body.position
  jointPoint = new Base(sidePos.x-(side2.w/2.2),sidePos.y-(side2.h/2.4),50,50)

  bridge = new Bridge(20,{x:width/16,y:height/2.8})
  Matter.Composite.add(bridge.body,jointPoint.body)
  link = new Link(bridge,jointPoint.body)
  frameRate(80);

  for (var i = 0;i < 8;i++) {
    var x = random(width/2 - 200,width/2 + 300)
    var y = random(-10,140)
    var stone = new Stone(x,y,40)
    stones.push(stone)
 }

  zombie = createSprite(width/2,height-50)
  zombie.addImage(zombieImg)
  zombie.scale = 0.1
  zombie.velocityX = -10

  button = createImg("assets/axe.png")
  button.position(200,200)
  button.size(50,50)
  button.mousePressed(handleButtonPress)
  
}

function draw() {
  background(0);
  Engine.update(engine);
  rectMode(CENTER)
  imageMode(CENTER)
  ellipseMode(RADIUS)

  image(backgroundImg,width/2,height/2,width,height)

  if (zombie.x < 300) {
    zombie.velocityX = 10
  }
  if (zombie.x > width-300) {
    zombie.velocityX = -10
  }
  for (var i = 0;i < stones.length;i++) {
    stones[i].display()
  }
  
  bridge.show()

  drawSprites()
}

function handleButtonPress() {
  link.detach()
  setTimeout(() => {
    bridge.break()
  },5000)
}