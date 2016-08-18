const View = require('./view.js');
$( () => {
  let $el = $('.board');
  let view = new View($el);
  view.setupGrid();

  // view.bindEvents();

});
