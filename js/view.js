const Board = require("./snake.js").Board;
const coordEquals = require("./snake.js").coordEquals;

class View{
  constructor(el){
    this.$el = el;
    this.board = new Board();
    this.snake = this.board.snake;
    // debugger
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
        // debugger
        this.snake.renderPos().forEach((pos) => {
          if(coordEquals(pos, [i,j])){
              $square.addClass('snake');
          }
        });
        // if(coordEquals(this.snake.pos, [i,j])){
        //   $square.addClass('snake');
        // }
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
    // this.snake.turn(dir);
    this.board.move(dir);
    this.$el.children().remove();
    this.setupGrid();
  }
}

module.exports = View;
