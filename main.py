import json
import random

wordmap = {}
for i in range(1000):
  key = "word-number-%d" % i
  x = (random.random() + random.random() + random.random())/3
  y = (random.random() + random.random() + random.random())/3
  
  wordmap[key] = {"x": x, "y": y}
  

f = open('testData.json', 'w')
json.dump(wordmap, f)
f.close()