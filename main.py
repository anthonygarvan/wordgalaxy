import json
import random

wordmap = {}
for i in range(100000):
  key = "word-number-%d" % i
  x_pos = random.random() + random.random() + random.random()
  y_pos = random.random() + random.random() + random.random()
  
  wordmap[key] = {"x_pos": x_pos, "y_pos": y_pos}
  

f = open('testData.json', 'w')
json.dump(wordmap, f)
f.close()