const View = require('./view.js');
$( () => {
  let $el = $('.snake');
  let view = new View($el);
  view.setupGrid();

  // view.bindEvents();

});
