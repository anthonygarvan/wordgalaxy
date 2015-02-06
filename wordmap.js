module.exports = function () {
  var geohash = require('ngeohash');
  var $ = require('jquery');
        geoHashDictionary = {};
        $.ajax({
             url:    '/testData.json',
             success: function(result) {
                          wordMap = result;
                          for(var word in wordMap) {
                            hash = geohash.encode(wordMap[word].x, wordMap[word].y, precision=6);
                            if(hash in geoHashDictionary) {
                              geoHashDictionary[hash].push(word);
                            } else {
                              geoHashDictionary[hash] = [word];  
                            }
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
    var hash = geohash.encode(wordMapPositions.x, wordMapPositions.y, precision=6);
    if(hash in geoHashDictionary) {
      var closestWord = "";
      var closestDistance = 1000;
      geoHashDictionary[hash].forEach(function(word, i, arr) {
        x2 = Math.pow((wordMapPositions.x - wordMap[word].x), 2);
        y2 = Math.pow((wordMapPositions.y - wordMap[word].y), 2);
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
    wordMap: wordMap,
    geoHashDictionary: geoHashDictionary,
    graphicsToWordMapCoordinates: graphicsToWordMapCoordinates,
    wordMapToGraphicsCoordinates: wordMapToGraphicsCoordinates,
    getWord: getWord
  };
}();