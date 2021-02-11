var gameState, play, end;

var monkey, M_A, MI, banana, B_Image, stone, S_Image, ground, IG, OG, BG, score;

function preload() {
  B_Image = loadImage("banana.png");
  S_Image = loadImage("stone.png");
  M_A=loadAnimation("Monkey_01.png","Monkey_02.png",
                    "Monkey_03.png","Monkey_04.png",
                    "Monkey_05.png","Monkey_06.png",
                    "Monkey_07.png","Monkey_08.png",
                    "Monkey_09.png","Monkey_10.png");
  MI = loadImage("Monkey_01.png");
}

function setup() {
  createCanvas(400, 400);
  
  play = 1;
  end = 0;
  gameState = play;
  
  ground = createSprite(200,370,400,20);
  ground.x = ground.width/2;
  ground.velocityX = -5;
  
  monkey = createSprite(50,360,20,20);
  monkey.addAnimation("n",M_A);
  monkey.scale = 0.1;
  
  IG = createSprite(200,385,400,20);
  IG.visible = false;
  
  score = 0;
  
  OG = new Group();
  BG = new Group();
}

function draw() {
  background(220);
  
  if(ground.x>0) {
     ground.x = ground.width/2;
     }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(gameState===play){
    SO();
    SB();
    
    text("score: " + score, 300, 50);
    
    score = Math.round(frameCount/8);
    
    if(keyDown("space")&&monkey.y>340) {
      monkey.velocityY = -16;       
    }
    
    if(monkey.isTouching(BG)) {
      BG.destroyEach();
    }
    
    if(monkey.isTouching(OG)) {
      gameState = end;
    }
  }
  else if(gameState===end) {
    ground.velocityX = 0;      
    monkey.collide(OG); 
    OG.destroyEach();
    BG.destroyEach();  
  }
  drawSprites();
  monkey.collide(IG);
}

function SO() {
  if(frameCount%300===0) {
    stone = createSprite(400,340,20,20);
    stone.addAnimation("s",S_Image);
    stone.scale = 0.2;  
    stone.velocityX = -5;  
    OG.add(stone);
  }
}

function SB() {
  if(frameCount%80===0) {
    banana = createSprite(400,200,20,20);
    banana.addImage(B_Image);
    banana.velocityX = -5;
    banana.scale = 0.05;
    BG.add(banana);
  }
}