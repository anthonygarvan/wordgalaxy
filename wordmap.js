module.exports = function () {
  var geohash = require('ngeohash');
  var $ = require('jquery');
        geoHashDictionary = {};
        $.ajax({
             url:    '/testData.json',
             success: function(result) {
                          wordMap = result;
                          for(var word in wordMap) {
                            hash = geohash.encode(wordMap[word].x, wordMap[word].y, precision=5);
                            geoHashDictionary[hash] = word;
                          }
                      },
             async:   false
        });
  
  function graphicsToWordMapCoordinates(x,y) {
    var scale = window.innerHeight;
    var width = window.innerWidth;
    x_out = (x - width/2)/scale + 0.5;
    y_out = y/scale;
    return {x: x_out, y: y_out};  
  }
  
  function wordMapToGraphicsCoordinates(x,y) {
    var scale = window.innerHeight;
    var width = window.innerWidth;
    x_out = scale*(x-0.5) + width/2;
    y_out = scale*y;
    return {x: x_out, y: y_out};
  }
  
  function getWord(x, y) {
    wordMapPositions = graphicsToWordMapCoordinates(x, y);
    var hash = geohash.encode(wordMapPositions.x, wordMapPositions.y, precision=5);
    if(hash in geoHashDictionary) {
      return geoHashDictionary[hash];
    }
    return "";
  }
  
  return {
    wordMap: wordMap,
    geoHashDictionary: geoHashDictionary,
    graphicsToWordMapCoordinates: graphicsToWordMapCoordinates,
    wordMapToGraphicsCoordinates: wordMapToGraphicsCoordinates,
    getWord: getWord
  };
}();