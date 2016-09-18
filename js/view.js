const Board = require("./snake.js").Board;
const coordEquals = require("./snake.js").coordEquals;

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
      this.board.firstMove = false;
      this.makeMove(dir);
    });
  }
  step(){
    this.stepInterval = window.setInterval(()=>this.makeMove(),200);
  }

  makeMove(dir){
    if (this.board.gameOver && !this.board.firstMove){
      alert('Game Over!');
      window.clearInterval(this.stepInterval);
      return;
    }
    if (!dir){
      dir = this.snake.direction;
    }
    this.board.move(dir);
    this.$el.children().remove();
    this.setupGrid();
  }
}

module.exports = View;
