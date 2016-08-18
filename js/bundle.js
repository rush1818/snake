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
	  let $el = $('.snake');
	  let view = new View($el);
	  view.setupGrid();

	  // view.bindEvents();

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

	class View{
	  constructor(el){
	    this.$el = el;
	    this.board = new Board();
	    // this.bindEvents();
	  }

	  setupGrid(){
	    for (var i = 0; i < 10; i++) {
	      let $row = $("<ul></ul>");
	      $row.addClass('row group');
	      this.$el.append($row);
	      for (var j = 0; j < 10; j++) {
	        let $square = $("<li></li>");
	        $square.addClass('square');
	        $square.attr({"pos":[i,j]});
	        $row.append($square);
	      }
	    }
	  }

	  // bindEvents(){
	  //   let $square = $(".square");
	  //   $square.on("click", event => {
	  //     const currentTarget = event.currentTarget;
	  //     const $currentTarget = $(currentTarget);
	  //     this.makeMove($currentTarget);
	  //   });
	  // }
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
	    this.direction = "N";
	    this.segments = [];
	    this.pos = [0,0];
	  }



	  move(){
	    let moveDir = 1;
	    if (this.direction === "N"){
	      moveDir = DIRECTIONS.N;
	    }else if (this.direction === "E"){
	      moveDir = DIRECTIONS.E;
	    }else if (this.direction === "S"){
	      moveDir = DIRECTIONS.S;
	    }else if (this.direction === "W"){
	      moveDir = DIRECTIONS.W;
	    }
	    this.pos = coordPlus(this.pos, moveDir);
	  }

	  turn(dir) {
	    this.direction = dir;
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


/***/ }
/******/ ]);