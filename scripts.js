document.getElementById("page2").style.display = "none";

function test(){
console.log("test");
}

function openCard() {


    document.getElementById("page1").style.display = "none";
    document.getElementById("page2").style.display = "block";

    var music = document.getElementById("music");
    music.play();

  
  }
  const SCALE = 1.0;
  const WIDTH = 64;
  const HEIGHT = 64;
  const SCALED_WIDTH = SCALE * WIDTH;
  const SCALED_HEIGHT = SCALE * HEIGHT;
  let CYCLE_LOOP = [0, 1, 2,3,4,5];
  const FACING_DOWN = 2;
  const FACING_UP = 2;
  const TALKING = 0;
  const FACING_LEFT = 2;
  const FACING_RIGHT = 2;
  const SLEEPING = 3;
  const EATING = 4;
  const SHELLSHOCKED = 5;
  let FRAME_LIMIT = 12;
  let MOVEMENT_SPEED = 0.5;
  let eating = false;
  let munch=false;
  
  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');
  let keyPresses = {};
  let currentDirection = SLEEPING;
  let currentLoopIndex = 0;
  let frameCount = 0;
  let positionX = 0;
  let positionY = 0;
  let img = new Image();

function linkToVideo(){
  window.location='https://youtu.be/ThWKepbuKVY';
}
  
  window.addEventListener('keydown', keyDownListener);
  function keyDownListener(event) {
      keyPresses[event.key] = true;
  }
  
  window.addEventListener('keyup', keyUpListener);
  function keyUpListener(event) {
      keyPresses[event.key] = false;
      munch = false;
  }
  
  function loadImage() {
    img.src = 'turtle.png';
    img.onload = function() {
      window.requestAnimationFrame(gameLoop);
    };
  }
  
  function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(img,
                  frameX * WIDTH, frameY * HEIGHT, WIDTH, HEIGHT,
                  canvasX, canvasY, SCALED_WIDTH, SCALED_HEIGHT);
  }
  
  loadImage();
  
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    let hasMoved = false;
    let talking = false;
  
    if (keyPresses.w ||keyPresses.W ) {
        MOVEMENT_SPEED = 0.5;
      CYCLE_LOOP = [0, 1, 2,3]; 
      moveCharacter(0, -MOVEMENT_SPEED, FACING_UP);
      hasMoved = true;
     
    } else if (keyPresses.s || keyPresses.S) {
        MOVEMENT_SPEED = 0.5;
      CYCLE_LOOP = [0, 1, 2,3]; 
      moveCharacter(0, MOVEMENT_SPEED, FACING_DOWN);
      hasMoved = true;
    }
  
    if (keyPresses.c || keyPresses.C) {
      MOVEMENT_SPEED = 0.0;
      CYCLE_LOOP = [0, 1, 2,3,4,5,6,7,8,9];
      moveCharacter(-MOVEMENT_SPEED, 0, TALKING);
      hasMoved = true;
      talking=true;
    } else if (keyPresses.d || keyPresses.D) {
      CYCLE_LOOP = [0, 1, 2,3]; 
      MOVEMENT_SPEED = 0.5;
      moveCharacter(MOVEMENT_SPEED, 0, FACING_RIGHT);
      hasMoved = true;
    }
    else if (keyPresses.a || keyPresses.A) {
        CYCLE_LOOP = [0, 1, 2,3]; 
        MOVEMENT_SPEED = 0.5;
        moveCharacter(-MOVEMENT_SPEED, 0, FACING_LEFT);
        hasMoved = true;
      }

    if (keyPresses.q || keyPresses.Q) {
        MOVEMENT_SPEED = 0.0;
      CYCLE_LOOP = [0, 1, 2,3,4,5]; 
      moveCharacter(0, -MOVEMENT_SPEED, SLEEPING);
      hasMoved = true;
    } else if (keyPresses.e || keyPresses.E) {
        MOVEMENT_SPEED = 0.0;
      CYCLE_LOOP = [0, 1, 2,3,4]; 
      moveCharacter(0, MOVEMENT_SPEED, EATING);
      hasMoved = true;
      eating = true;
      if(positionY > 41 && positionY < 57 && positionX >= 234 && eating==true){
        munch=true;
        }else{munch=false;}
    }

    if (keyPresses.z || keyPresses.Z) {
        MOVEMENT_SPEED = 0.0;
      CYCLE_LOOP = [0, 1, 2,3,4,5,6,7,8,9]; 
      moveCharacter(0, -MOVEMENT_SPEED, SHELLSHOCKED);
      hasMoved = true;
      var hide = document.getElementById("hide");
      hide.play();
      FRAME_LIMIT = 10.05;
    } 
 

    if(munch){
        document.getElementById("munch").style.display = "block";
          var audio = document.getElementById("crunch");
        audio.play();
    }
    if(!munch){
        document.getElementById("munch").style.display = "none";
    }

  
  
    if (hasMoved) {
      frameCount++;
      if (frameCount >= FRAME_LIMIT) {
        frameCount = 0;
        currentLoopIndex++;
        if (currentLoopIndex >= CYCLE_LOOP.length) {
          currentLoopIndex = 0;
        }
      }
    }

    if(talking){
        document.getElementById("happyBday").style.display = "block";
        var speaking = document.getElementById("speaking");
        speaking.play();
    }
    if(!talking){
        document.getElementById("happyBday").style.display = "none";
    }
  
    if (!hasMoved) {
      currentLoopIndex = 0;
    }
  
    drawFrame(CYCLE_LOOP[currentLoopIndex], currentDirection, positionX, positionY);
    window.requestAnimationFrame(gameLoop);
  }
  
  function moveCharacter(deltaX, deltaY, direction) {
    if (positionX + deltaX > 0 && positionX + SCALED_WIDTH + deltaX < canvas.width) {
      positionX += deltaX;
    }
    if (positionY + deltaY > 0 && positionY + SCALED_HEIGHT + deltaY < canvas.height) {
      positionY += deltaY;
    }
    currentDirection = direction;
  }

