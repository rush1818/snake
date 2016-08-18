

const DIRECTIONS = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};

class Snake {
  constructor(){
    this.direction = 38;
    this.segments = [];
    this.pos = [0,0];
  }



  move(){
    let moveDir = 1;
    if (this.direction === 37){
      moveDir = DIRECTIONS.N;
    }else if (this.direction === 40){
      moveDir = DIRECTIONS.E;
    }else if (this.direction === 39){
      moveDir = DIRECTIONS.S;
    }else if (this.direction === 38){
      moveDir = DIRECTIONS.W;
    }

    if (this.segments.length){
      this.segments.pop();
      this.segments.unshift(this.pos);
    }
    this.pos = coordPlus(this.pos, moveDir);
  }

  renderPos(){
    let head = this.pos.slice(0);
    // debugger
    let segs = this.segments.slice(0);
    segs.push(head);
    return segs;
  }

  turn(dir) {
    this.direction = dir;
    this.move();
  }

  eat(pos){
    this.segments.unshift(pos);
  }

}

function coordPlus(arr1, arr2){
  return [arr1[0]+arr2[0] , arr1[1]+arr2[1]];
}

function coordEquals(arr1, arr2){
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}

class Apple{
  constructor(rows, snake){
    this.pos = this.getPos(rows, snake);
    this.type = "apple";
  }

  getPos(rows, snake){
    let newPos = [Math.floor(Math.random()*rows), Math.floor(Math.random()*rows)];
    let snakePos = snake.renderPos();
    for (let i = 0; i < snakePos.length; i++){
      if (coordEquals(newPos, snakePos[i])){
        return this.getPos(rows, snake);
      }
    }
    return newPos;
  }
}

class Board {
  constructor(){
    this.snake = new Snake();
    this.rows = 10;
    this.apple = new Apple(this.rows, this.snake);
  }

  isValidPos(dir){
    let changePos = [];
    if (dir === 37){
      changePos = DIRECTIONS.N;
    }else if (dir === 40){
      changePos = DIRECTIONS.E;
    }else if (dir === 39){
      changePos = DIRECTIONS.S;
    }else if (dir === 38){
      changePos = DIRECTIONS.W;
    }
    let newPos = coordPlus(this.snake.pos, changePos);
    return newPos[0] < this.rows && newPos[0] >=0 &&
      newPos[1] >=0 && newPos[1] < this.rows;
  }

  move(dir){
    if (this.isValidPos(dir)){
      this.checkEat();
      this.snake.turn(dir);
      return true;
    }
    return false;
  }

  checkEat(){
    if (coordEquals(this.snake.pos, this.apple.pos)){
      this.snake.eat(this.apple.pos);
      this.apple = new Apple(this.rows, this.snake);
    }
  }
}


module.exports = {
  Board: Board,
  coordEquals: coordEquals,
};
