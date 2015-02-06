module.exports = function (graph, layout) {
  var width = window.innerWidth,
      height = window.innerHeight;

  var stage = new PIXI.Stage(0x000000, true);
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, true);
  renderer.view.style.display = "block";
  document.body.appendChild(renderer.view);

  var graphics = new PIXI.Graphics();
  graphics.position.x = 0;
  graphics.position.y = 0;

  graphics.scale.x = 1;
  graphics.scale.y = 1;
  stage.addChild(graphics);

  return {
    renderFrame: function () {
      layout.step();
      drawGraph(graphics);
      renderer.render(stage);
    },
    domContainer: renderer.view,
    graphGraphics: graphics,
    stage: stage
  };
}
var wordMap;
function drawGraph(graphics) {
  // No magic at all: Iterate over positions array and render nodes/links
  var width = window.innerWidth;
  var i, x, y, x1, y1;
  
  if(wordMap) {
    graphics.lineStyle(0);
    graphics.clear();
      
    var scale = window.innerHeight;
    for(var wordEntry in wordMap) {
        x = scale*(wordMap[wordEntry].x-0.5) + width/2;
        y = scale*wordMap[wordEntry].y;
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(x, y, 1, 1);
        graphics.endFill();
    };
  } else {
        var $ = require('jquery');
        $.ajax({
             url:    '/testData.json',
             success: function(result) {
                          wordMap = result;
                      },
             async:   false
        });
  }
}
