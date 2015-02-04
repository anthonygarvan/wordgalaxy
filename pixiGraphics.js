module.exports = function (graph, layout) {
  var width = window.innerWidth,
      height = window.innerHeight;

  var stage = new PIXI.Stage(0xFFFFFF, true);
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, true);
  renderer.view.style.display = "block";
  document.body.appendChild(renderer.view);

  var graphics = new PIXI.Graphics();
  graphics.position.x = 0;
  graphics.position.y = 0;

  graphics.scale.x = .5;
  graphics.scale.y = .5;
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
var testData;
function drawGraph(graphics) {
  // No magic at all: Iterate over positions array and render nodes/links

  var i, x, y, x1, y1;
  
  if(testData) {
      graphics.lineStyle(0);
      graphics.clear();
      graphics.beginFill(0xFF3300);
        var xScale = window.innerWidth;
    for(var wordEntry in testData) {
        x = xScale*testData[wordEntry].x - 5;
        y = xScale*testData[wordEntry].y - 5;
        graphics.drawRect(x, y, 10, 10);
    };
  } else {
        var $ = require('jquery');
        $.ajax({
             url:    '/testData.json',
             success: function(result) {
                          testData = result;
                      },
             async:   false
        });
  }
}
