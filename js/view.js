const Board = require("./snake.js");

class View{
  constructor(el){
    this.$el = el;
    this.board = new Board();
    this.snake = this.board.snake;
    this.bindEvents();
  }

  setupGrid(){
    for (var i = 0; i < this.board.rows; i++) {
      let $row = $("<ul></ul>");
      $row.addClass('row group');
      this.$el.append($row);
      for (var j = 0; j < this.board.rows; j++) {
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
      const dir = event.which;
      this.makeMove(dir);
    });
  }
  step(){
    window.setInterval(()=>this.makeMove(),1000);
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
