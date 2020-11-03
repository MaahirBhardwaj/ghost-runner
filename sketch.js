var tower, towerImage;
var door, doorImage, doorGroup;
var climder, climberImage, climberGroup;
var ghost, ghostImage;
var invisibleblock, invisibleblockGroup;
var gameState="play";
var spookysound;

function preload(){
towerImage=loadImage("tower.png")
doorImage=loadImage("door.png") 
climberImage=loadImage("climber.png")
ghostImage=loadImage("ghost-standing.png");
spookysound=loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookysound.loop();
  tower=createSprite(300,300)
  tower.addImage(towerImage);
  tower.velocityY=1;
  doorGroup=new Group();
  climberGroup=new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage(ghostImage);
  ghost.scale=0.3;
  invisibleblockGroup=new Group();
}

function draw(){
  background(0);
  if(gameState==="play"){
    
  if(tower.y>600){
    tower.y=300;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if(keyDown("right_arrow"))  {
    ghost.x=ghost.x+3;
  }
    ghost.velocityY=ghost.velocityY+0.5;
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
    }
  spawndoors();
  drawSprites();
  }
  if(gameState==="end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over",230,250);
  }
}
function spawndoors(){
  if(frameCount%240===0){
door=createSprite(200,-50);
    door.addImage(doorImage);
    door.velocityY=1;
    door.x=Math.round(random(120,400));
    door.lifetime=600;
    doorGroup.add(door);
    climber=createSprite(200,10);
    climber.addImage(climberImage);
    climber.x=door.x;
    climber.velocityY=1;
    climberGroup.add(climber);
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    invisibleblock=createSprite(200,10);
    invisibleblock.width=climber.width;
    invisibleblock.height=2;
    invisibleblock.x=door.x;
    invisibleblock.velocityY=1;
    invisibleblockGroup.add(invisibleblock);
  }
}