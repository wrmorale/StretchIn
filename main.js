title = "StretchIn";

description = "[Hold  Stretch]";

characters = [];

options = {
  viewSize: { x: 100, y: 100 }
};

/**
 * @type {{
 * pos:vector, 
 * width: number, 
 * height: number
 * }[]}
 */ 
let wall1;
/**
 * @type {{
 * pos:vector, 
 * width: number, 
 * height: number
 * }[]}
 */ 
let wall2;
let nextWallDist;

/**
 * @type {{
 * height: number,
 * posX: number, 
 * posY: number, 
 * }}
 */
let stretcher;

//creating the invisible top and bottom of the player
/**
 * @type {{
 * posX: number, 
 * posY: number, 
 * }}
 */
let sTop;

/**
 * @type {{
 * posX: number, 
 * posY: number, 
 * }}
 */
let sBot;

function update() {
  if (!ticks) {
    wall1 = [{pos: vec(50, 0), width: 3, height:15 }];
    wall2 = [{pos: vec(50, 100), width: 3, height: -15}];
    stretcher = {height: 5, posX: 10, posY: 50};
    sTop = {posX: 10, posY: 48}
    sBot = {posX: 10, posY: 52}
    nextWallDist = 0;
  }

  const scr = difficulty * 0.5;

  //added a cap to the max height
  if(input.isPressed && stretcher.height < 100){
    stretcher.height++;
    sTop.posY--;
    sBot.posY++;
  }else if(stretcher.height > 5 && !input.isPressed){
    stretcher.height--;
    sTop.posY++;
    sBot.posY--;
  }
  color("black");
  box(stretcher.posX, stretcher.posY, 1, stretcher.height);
  nextWallDist -= scr;
  if(nextWallDist < 0){
    const isCollidingWithPlayer = (
      wall1.height > sTop.posY || wall2.height < sBot.posY
    )
    const w1 = {pos: vec(100, 0),   width: 3, height: rnd(0,40) };
    const w2 = {pos: vec(100, 100), width: 3, height: rnd(0, -40)};
    wall1.push(w1);
    wall2.push(w2);
    nextWallDist += rnd(50, 70);
  }
  remove(wall1, (w1) =>{
    w1.pos.x -= scr;
    color("red");
    rect(w1.pos, w1.width, w1.height);
    return w1.pos.x < -w1.height;
  });
  remove(wall2, (w2) =>{
    w2.pos.x -= scr;
    color("red");
    rect(w2.pos, w2.width, w2.height);
    return w2.pos.x < w2.height;
  });
  // const isCollidingWithPlayer = (
  //   wall1.height > sTop.posY || wall2.height < sBot.posY
  // )
}

addEventListener("load", onLoad);