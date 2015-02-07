import json
import random
#from sklearn.manifold import TSNE
from tsne import bh_sne
from numpy.random import rand
from sklearn.preprocessing import MinMaxScaler
from time import time
import numpy as np

start_time = time()
n_samples = 20000
#wordlist = ["word-%d" % i for i in range(n_samples)]
#print "creating random samples..."
#X_raw = rand(n_samples,250)

f = open("data/vectors0.txt", 'r')

isHeader = True
X_list = []
word_list = []
for line in f:
  if not isHeader:
    entries = line.strip().split(' ')
    #print "length: %d" % len(entries)
    word_list.append(entries[0])
    stringVector = entries[1:]
    #print stringVector
    v = [float(entry) for entry in stringVector]
    X_list.append(v)
  isHeader = False
  
X_raw = np.array(X_list[:n_samples])

print X_raw
print "transforming data to two dimensions..."
X_2d = bh_sne(X_raw)
X_scaled = MinMaxScaler().fit_transform(X_2d)
#X_scaled = X_2d
wordmap = {}

print "formatting data..."
for i in range(0, len(X_scaled)):
  x = X_scaled[i][0]
  y = X_scaled[i][1]
  key = word_list[i]
  wordmap[key] = {"x": x, "y": y}
  

f = open('testData.json', 'w')
json.dump(wordmap, f)
f.close()

end_time = time()
duration = float(end_time - start_time) / 60
print "Duration: %f minutes." % duration