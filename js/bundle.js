/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	$( () => {
	  let $el = $('.board');
	  let view = new View($el);
	  view.setupGrid();
	  view.step();
	  // view.bindEvents();

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2).Board;
	const coordEquals = __webpack_require__(2).coordEquals;

	class View{
	  constructor(el){
	    this.$el = el;
	    this.board = new Board();
	    this.snake = this.board.snake;
	    this.bindEvents();
	  }

	  setupGrid(){
	    this.apple = this.board.apple;
	    for (var i = 0; i < this.board.rows; i++) {
	      let $row = $("<ul></ul>");
	      $row.addClass('row group');
	      this.$el.append($row);
	      for (var j = 0; j < this.board.rows; j++) {
	        let $square = $("<li></li>");
	        $square.addClass('square');
	        $square.attr({"pos":[i,j]});

	        this.snake.renderPos().forEach((pos) => {
	          if(coordEquals(pos, [i,j])){
	              $square.addClass('snake');
	          }
	        });
	        if(coordEquals(this.apple.pos, [i,j])){
	          $square.addClass('apple');
	        }
	        $row.append($square);
	      }
	    }
	  }

	  bindEvents(){
	    let $square = $(".square");
	    $(document).on("keydown", event => {
	      const dir = event.which;
	      this.makeMove(dir);
	    });
	  }
	  step(){
	    window.setInterval(()=>this.makeMove(),500);
	  }

	  makeMove(dir){
	    if (!dir){
	      dir = this.snake.direction;
	    }
	    this.board.move(dir);
	    this.$el.children().remove();
	    this.setupGrid();
	  }
	}

	module.exports = View;


/***/ },
/* 2 */
/***/ function(module, exports) {

	

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


/***/ }
/******/ ]);