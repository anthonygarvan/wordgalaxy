module.exports = function (graph, layout) {
  var width = window.innerWidth,
      height = window.innerHeight - 50;

  var stage = new PIXI.Stage(0x000000, true);
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, true);
  renderer.view.style.display = "block";
  document.getElementById("galaxy").appendChild(renderer.view);

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
};

wg = require('./wordgalaxy');
function drawGraph(graphics) {
  // No magic at all: Iterate over positions array and render nodes/links
  
  var i, x, y, x1, y1;
  
    graphics.lineStyle(0);
    graphics.clear();
      
    for(var word in wg.wordGalaxy) {
        positions = wg.wordGalaxyToGraphicsCoordinates(wg.wordGalaxy[word].x, wg.wordGalaxy[word].y);
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(positions.x, positions.y, 1, 1);
        graphics.endFill();
    }
}
