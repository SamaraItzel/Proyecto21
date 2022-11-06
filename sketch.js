var fondoImg, fondo;
var fuego_cayendo, fuego, fuegoGroup;
var globo, globo_flotando;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play";
var score=0;

function preload(){
  fondoImg = loadImage("fondo.png");
  fuego_cayendo = loadAnimation("fuego1.png", "fuego2.png");
  
  globo_flotando = loadAnimation("globo1.png", "globo2.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  fondo = createSprite(windowWidth/2,windowHeight/2);
  fondo.scale=2.5;
  fondo.addImage("fondo",fondoImg);
  fondo.velocityY = 1;
  
  fuegoGroup = new Group();
  invisibleBlockGroup = new Group();
  
  globo = createSprite(200,200,50,50);
  globo.scale = 0.025;
  globo.addAnimation("flotando", globo_flotando);

  score=0;

}

function draw(){
  background(0);
  textSize(20);
  fill("GRAY");
  stroke("GRAY");
  text("Puntuación: "+score,width/2,50);

    if (gameState === "play") {
      score=score+Math.round(getFrameRate()/60);
      fondo.velocityY=(6+2*score/100);

    if(keyDown("left_arrow")){
      globo.x = globo.x - 3;
    }
    
    if(keyDown("right_arrow")){
      globo.x = globo.x + 3;
    }
    
    if(keyDown("up_arrow")||keyDown("space")){
      globo.velocityY = -8;
    }
    
    globo.velocityY = globo.velocityY + 0.25 ;
    
    if(fondo.y > 400){
      fondo.y = 300
    }
    spawnFuego();

    
    if(invisibleBlockGroup.isTouching(globo) || globo.y > 600){
      globo.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Fin del juego", width/2,250)
  }

}

function spawnFuego() {
 
  if (frameCount % 100 === 0) {
    var fuego = createSprite(200, -30);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = 30;
    invisibleBlock.height = 30;
    
    fuego.x = Math.round(random(90,width-90));
    invisibleBlock.x = fuego.x;
    invisibleBlock.y=fuego.y;
    
    fuego.addAnimation("cayendo", fuego_cayendo);
    fuego.scale=0.2;
    
    fuego.velocityY = 2;
    invisibleBlock.velocityY = 2;
    
    globo.depth = fuego.depth;
    globo.depth +=1;
   
    //asignar lifetime a la variable
    fuego.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //agregar cada puerta al grupo
    fuegoGroup.add(fuego);
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);
  }
}

