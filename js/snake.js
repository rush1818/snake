

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
    // When snake eats an apple, we push head into segment and reset head
        // to new pos
    // Push current pos into segment
    // Pop 1 out of segment
    // then update head as line below
    this.pos = coordPlus(this.pos, moveDir);
  }

  turn(dir) {
    this.direction = dir;
    if (isValidMOve) {

    }this.move();
  }

}

function coordPlus(arr1, arr2){
  return [arr1[0]+arr2[0] , arr1[1]+arr2[1]];
}


function coordEquals(arr1, arr2){
  return arr1[0] === arr2[0] && arr1[1] === arr2[1];
}


// function coordIsOpposite(arr1, arr2){
//
// }


class Board {
  constructor(){
    this.snake = new Snake();
  }
}


module.exports = Board;
