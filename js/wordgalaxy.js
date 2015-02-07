module.exports = function () {
  var geohash = require('ngeohash');
  var $ = require('jquery');
        geoHashDictionary = {};
        $.ajax({
             url:    '/processing/wordGalaxy.json',
             success: function(result) {
                          wordGalaxy = result;
                          for(var word in wordGalaxy) {
                            hash = geohash.encode(wordGalaxy[word].x, wordGalaxy[word].y, precision=6);
                            if(hash in geoHashDictionary) {
                              geoHashDictionary[hash].push(word);
                            } else {
                              geoHashDictionary[hash] = [word];  
                            }
                          }
                      },
             async:   false
        });
  
  function graphicsToWordGalaxyCoordinates(x,y) {
    var scale = window.innerHeight - 50;
    var width = window.innerWidth;
    x_out = (x - width/2)/scale + 0.5;
    y_out = y/scale;
    return {x: x_out, y: y_out};  
  }
  
  function wordGalaxyToGraphicsCoordinates(x,y) {
    var scale = window.innerHeight - 50;
    var width = window.innerWidth;
    x_out = scale*(x-0.5) + width/2;
    y_out = scale*y;
    return {x: x_out, y: y_out};
  }
  
  function getWord(x, y) {
    wordGalaxyPositions = graphicsToWordGalaxyCoordinates(x, y);
    var hash = geohash.encode(wordGalaxyPositions.x, wordGalaxyPositions.y, precision=6);
    if(hash in geoHashDictionary) {
      var closestWord = "";
      var closestDistance = 1000;
      geoHashDictionary[hash].forEach(function(word, i, arr) {
        x2 = Math.pow((wordGalaxyPositions.x - wordGalaxy[word].x), 2);
        y2 = Math.pow((wordGalaxyPositions.y - wordGalaxy[word].y), 2);
        d = x2 + y2;
        
        if(d < closestDistance) {
          closestDistance = d;
          closestWord = word;
        }
      })
      return closestWord;
    }
    return "";
  }
  
  return {
    wordGalaxy: wordGalaxy,
    geoHashDictionary: geoHashDictionary,
    graphicsToWordGalaxyCoordinates: graphicsToWordGalaxyCoordinates,
    wordGalaxyToGraphicsCoordinates: wordGalaxyToGraphicsCoordinates,
    getWord: getWord
  };
}();