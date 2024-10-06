#!/usr/bin/env python3
import os
import sys
import json
import hashlib
from urllib.request import urlopen
from os.path import exists
from pathlib import Path

def download_and_check(filename, url, hash):
    hash_md5 = hashlib.md5()
    if not exists(filename):
        with urlopen(url) as response:
            filecontent = response.read()
            hash_md5.update(filecontent)
            hash_check = hash_md5.hexdigest()
            if hash == hash_check:
                with open(filename, 'wb') as file:
                    file.write(filecontent)
                    print('downloaded external asset "' + filename + '"')
            else:
                print('error downloading asset "' + filename + '" hash mismatch!')
                print(hash_check)
                print(url)

with open("wordlists-source.json",'r') as dicts_file:
    dicts = json.load(dicts_file)

for dict in dicts:
    download_and_check(dict['name']+'.txt', dict['from'], dict['md5'])