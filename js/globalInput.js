module.exports = function (graphics) {
  var addWheelListener = require('./lib/addWheelListener');
  var geohash = require('ngeohash');
  var graphGraphics = graphics.graphGraphics;

  addWheelListener(graphics.domContainer, function (e) {
    zoom(e.clientX, e.clientY, e.deltaY < 0);
  });

  addDragNDrop();

  var getGraphCoordinates = (function () {
    var ctx = {
      global: { x: 0, y: 0} // store it inside closure to avoid GC pressure
    };

    return function (x, y) {
      ctx.global.x = x; ctx.global.y = y;
      return PIXI.InteractionData.prototype.getLocalPosition.call(ctx, graphGraphics);
    }
  }());

  function zoom(x, y, isZoomIn) {
    direction = isZoomIn ? 1 : -1;
    var factor = (1 + direction * 0.1);
    graphGraphics.scale.x *= factor;
    graphGraphics.scale.y *= factor;

    // Technically code below is not required, but helps to zoom on mouse
    // cursor, instead center of graphGraphics coordinates
    var beforeTransform = getGraphCoordinates(x, y);
    graphGraphics.updateTransform();
    var afterTransform = getGraphCoordinates(x, y);

    graphGraphics.position.x += (afterTransform.x - beforeTransform.x) * graphGraphics.scale.x;
    graphGraphics.position.y += (afterTransform.y - beforeTransform.y) * graphGraphics.scale.y;
    graphGraphics.updateTransform();
  }

  function addDragNDrop() {
    var stage = graphics.stage;
    stage.setInteractive(true);
    var text = new PIXI.Text("", {font:"50px Courier", fill:"white"});
    text.position.x = 50;
    text.position.y = 50;
    stage.addChild(text);
    
    var drawing = new PIXI.Graphics();
    stage.addChild(drawing);
    
    var isDragging = false,
        prevX, prevY;

    stage.mousedown = function (moveData) {
      var pos = moveData.global;
      prevX = pos.x; prevY = pos.y;
      isDragging = true;
    };
    wg = require('./wordgalaxy');
    stage.mousemove = function (moveData) {
      var pos = moveData.global;
      var graphPos = getGraphCoordinates(pos.x, pos.y);
      var word = wg.getWord(graphPos.x, graphPos.y);
      text.setText(word);
      
      if(word) {
        highlightPos = wg.wordGalaxyToGraphicsCoordinates(wg.wordGalaxy[word].x, wg.wordGalaxy[word].y);
        drawing.visible = true;
        drawing.scale.x = graphGraphics.scale.x;
        drawing.scale.y = graphGraphics.scale.y;
        drawing.position.x = graphGraphics.position.x;
        drawing.position.y = graphGraphics.position.y;
        drawing.clear();
        drawing.beginFill(0xFFFFFF);
        drawing.drawCircle(highlightPos.x, highlightPos.y, 4);
      } else {
        drawing.visible = false;
      }
      
      if (!isDragging) {
        return;
      }
      var dx = pos.x - prevX;
      var dy = pos.y - prevY;

      graphGraphics.position.x += dx;
      graphGraphics.position.y += dy;
      prevX = pos.x; prevY = pos.y;
    };

    stage.mouseup = function (moveDate) {
      isDragging = false;
    };
  }
}
