#!/usr/bin/env python3
import sys
import json

if len(sys.argv) < 2:
    print("usage: python "+sys.argv[0]+" [textfile]")
    sys.exit()

filename = sys.argv[1]
dictname = filename.rsplit('.',1)[0] #remove .txt or .asc

try:
    with open("../docs/dice/wordlists.json",'r') as dicts_file:
        dicts = json.load(dicts_file)
except:
    #starting with new dicts.json
    dicts = []

with open("wordlists-source.json",'r') as dicts_file:
    dicts_src = json.load(dicts_file)

dict = {'name':dictname, 'type':'', 'from':''}
for checkdict in dicts:
    if checkdict['name'] == dictname:
        dict = checkdict
        dicts.remove(checkdict)
        break
for checkdict in dicts_src:
    if checkdict['name'] == dictname:
        dict['from'] = checkdict['from']
        break

jsdict = {} #key, value - key being dice rolls

jsdict2 = {} #number, value - single word per line
idx2 = 0

try:
    with open(filename, 'r') as f:
        for line in f.readlines():
            linesplit = line.split()
            if len(linesplit) == 1:
                idx2 = idx2 + 1
                jsdict2[idx2] = linesplit[0]
            if len(linesplit) != 2:
                continue
            key = linesplit[0]
            value = linesplit[1]
            if len(key) >= 4 and key.isdigit():
                jsdict[key] = value
except:
    print("could not read [textfile]!")
    sys.exit()

filename_out = "../docs/dice/wordlist/" + dictname + ".json"

if len(jsdict) == 0: #no key, value pairs found...
    with open(filename_out, 'w') as f:
        json.dump(jsdict2, f, indent=1, separators=(',', ':'))
    dict['type'] = 'r'+str(idx2)
    dicts.append(dict)
else:
    with open(filename_out, 'w') as f:
        json.dump(jsdict, f, indent=1, separators=(',', ':'))
    dict['type'] = 'd'+str(len( list(jsdict)[0] ))
    dicts.append(dict)
    print(filename_out + " written")

with open("../docs/dice/wordlists.json", 'w') as f:
    json.dump(dicts, f, indent=1, separators=(',', ':'))
