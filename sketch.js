var bg, bgIMG;
var playerShip, playerShipIMG;
var bulletIMG;
var alien1IMG, alien2IMG, alien3IMG, alien4IMG;
var alienGroup1, alienGroup2, alienGroup3, alienGroup4;
var pewSound, blastSound;
var bulletGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOverimg;
var blastGIF;
var music;
var restartButton, restartButtonIMG;

function preload() {
  bgIMG = loadImage("images/bg5.jpg");
  playerShipIMG = loadImage("images/spaceship_4.png");
  bulletIMG = loadImage("images/bullet.png");
  alien1IMG = loadImage("images/alienship_1.png");
  alien2IMG = loadImage("images/alienship_2.png");
  alien3IMG = loadImage("images/alienship_3.png");
  alien4IMG = loadImage("images/alienship_4.png");
  pewSound = loadSound("sounds/Pew.wav");
  blastSound = loadSound("sounds/Blast.mp3");
  gameOverimg = loadImage("images/gameOver.webp");
  blastGIF = loadImage("images/blastanime.gif");
  music = loadSound("sounds/bgmusic.wav");
  restartButtonIMG = loadImage("images/Restart.png");
}

function setup() {
  createCanvas(displayWidth, displayHeight - 143);

  music.loop();

  bg = createSprite(displayWidth / 2,displayHeight / 2,displayWidth - 50,displayHeight - 100);
  bg.addImage(bgIMG);
  //bg.y = bg.height/2;
  bg.scale = 2;

  console.log(displayWidth);
  

  playerShip = createSprite(displayWidth / 2, displayHeight - 203);
  playerShip.addImage(playerShipIMG);
  playerShip.scale = 0.25;

  restartButton = createSprite(displayWidth/2 + 25,displayHeight - 250);
  restartButton.addImage("restartIMG",restartButtonIMG);
  restartButton.scale = 0.5;

  alienGroup1 = new Group();
  alienGroup2 = new Group();
  alienGroup3 = new Group();
  alienGroup4 = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(255, 255, 255);

  if (gameState === PLAY){

      restartButton.visible = false;
      playerShip.visible = true;
      bg.visible = true;

      if (keyDown(LEFT)) {
        playerShip.x = playerShip.x - 6;
      } else if (keyDown(RIGHT)) {
        playerShip.x = playerShip.x + 6;
      }

      bg.velocityY = 2;

      if (bg.y > displayHeight + 300) {
        bg.y = displayHeight / 2;
      }

      if (playerShip.x > 1310) {
        playerShip.x = 1310;
      }
      if (playerShip.x < 58) {
        playerShip.x = 58;
      }

      if (keyDown(UP_ARROW) || keyDown(32) || touches.length > 0) {
        createBullets();
        touches = [];
      }

      if (bulletGroup.isTouching(alienGroup1)){
        score = score + 1;
        blastSound.play();
        bulletGroup.destroyEach();
        alienGroup1.destroyEach();
      }
      if (bulletGroup.isTouching(alienGroup2)){
        score = score + 2;
        blastSound.play();
        bulletGroup.destroyEach();
        alienGroup2.destroyEach();
      }
      if (bulletGroup.isTouching(alienGroup3)){
        score = score + 4;
        blastSound.play();
        bulletGroup.destroyEach();
        alienGroup3.destroyEach();
      }
      if (bulletGroup.isTouching(alienGroup4)){
        score = score + 2;
        blastSound.play();
        bulletGroup.destroyEach();
        alienGroup4.destroyEach();
      }
      if (playerShip.isTouching(alienGroup1)){
        gameState = END;
      }
      if (playerShip.isTouching(alienGroup2)){
        gameState = END;
      }
      if (playerShip.isTouching(alienGroup3)){
        gameState = END;
      }
      if (playerShip.isTouching(alienGroup4)){
        gameState = END;
      }

      var rand = Math.round(random(1,4));
      switch(rand){
        case 1 : spawnAlien1();
        break;

        case 2 : spawnAlien2();
        break;

        case 3 : spawnAlien3();
        break;

        case 4 : spawnAlien4();
        break;
      }
   

  }else if(gameState === END){
     background(gameOverimg);
     playerShip.visible = false;
     bulletGroup.destroyEach();
     alienGroup1.destroyEach();
     alienGroup2.destroyEach();
     alienGroup3.destroyEach();
     alienGroup4.destroyEach();
     bg.visible = false;
     restartButton.visible = true;
     if (mousePressedOver(restartButton)) {
      gameState = PLAY;
      score = 0;
    }
  }
  drawSprites();
  textSize(40);
  stroke(255,0,0);
  strokeWeight(2);
  fill(255,0,0);
  text("Score: " + score,20,50);
}

function spawnAlien1() {
   if(frameCount % 100===0){
    alien1 = createSprite(0,-30);
    alien1.addImage("a1",alien1IMG);
    alien1.x = Math.round(random(50,displayWidth-100));
    alien1.scale = 0.3;
    alien1.y = -10;
    alien1.velocityY = 5;
    alienGroup1.add(alien1);
    alien1.lifetime = displayHeight/5;
   }
}
function spawnAlien2() {
  if(frameCount % 140===0){
   var alien2 = createSprite(0,-30);
   alien2.addImage(alien2IMG);
   alien2.x = Math.round(random(50,displayWidth-100));
   alien2.scale = 0.3;
   alien2.y = -10;
   alien2.velocityY = 3;
   alienGroup2.add(alien2);
   alien2.lifetime = displayHeight/3;
  }
}
function spawnAlien3() {
  if(frameCount % 120===0){
   var alien3 = createSprite(0,-30);
   alien3.addImage(alien3IMG);
   alien3.x = Math.round(random(50,displayWidth-100));
   alien3.scale = 0.5;
   alien3.y = -10;
   alien3.velocityY = 6;
   alienGroup3.add(alien3);
   alien3.lifetime = displayHeight/6;
  }
}
function spawnAlien4() {
  if(frameCount % 150===0){
   var alien4 = createSprite(0,-30);
   alien4.addImage(alien4IMG);
   alien4.x = Math.round(random(50,displayWidth-100));
   alien4.scale = 0.3;
   alien4.y = -10;
   alien4.velocityY = 5;
   alienGroup4.add(alien4);
   alien4.lifetime = displayHeight/5;
  }
}

function createBullets() {
  if (frameCount%8===0){
  var bullet =createSprite(playerShip.x, playerShip.y);
  bullet.addImage(bulletIMG);
  bullet.scale = 0.5;
  pewSound.play();
  bullet.x = playerShip.x;
  bullet.y = playerShip.y;
  bullet.velocityY = -12;
  bullet.lifetime = displayHeight/12;
  bulletGroup.add(bullet);
  playerShip.depth = bullet.depth + 1;
  }
}

