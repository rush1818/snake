const Board = require("./snake.js");

class View{
  constructor(el){
    this.$el = el;
    this.board = new Board();
    this.snake = this.board.snake;
    this.bindEvents();
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
        if ((i === this.snake.pos[0]) && (j === this.snake.pos[1])) {
          $square.addClass('snake');
        }
        $row.append($square);
      }
    }
  }

  bindEvents(){
    let $square = $(".square");
    $(document).on("keydown", event => {
      const turnDir = event.which;
      this.makeMove(turnDir);
    });
  }

  makeMove(turnDir){
    this.snake.turn(turnDir);
    this.$el.children().remove();
    this.setupGrid();
  }
}

module.exports = View;
