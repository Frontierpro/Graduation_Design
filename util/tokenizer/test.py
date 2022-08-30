import json
from difflib import SequenceMatcher

tmp_list = []

with open('listening/index.json', 'r', encoding='utf-8') as file:
    tmp_list = json.load(file)

res_list = []

for tmp in tmp_list:
    if SequenceMatcher(None, tmp['index'], 'carbon').ratio() > 0.85:
        print(tmp['index'])
        res_list += tmp['list']

res_list = list(set(res_list))

print(res_list)
