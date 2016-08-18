const Board = require("./snake.js");

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
