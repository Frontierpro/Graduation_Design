import json

tmp_dist = {
    'reading': [],
    'listening': [],
    'speaking': [],
    'writing': []
}

with open('../../tokenizer/reading/index.json', 'r', encoding='utf-8') as file:
    for each in json.load(file):
        tmp_dist['reading'].append(each['index'])

with open('../../tokenizer/listening/index.json', 'r', encoding='utf-8') as file:
    for each in json.load(file):
        tmp_dist['listening'].append(each['index'])

with open('../../tokenizer/speaking/index.json', 'r', encoding='utf-8') as file:
    for each in json.load(file):
        tmp_dist['speaking'].append(each['index'])

with open('../../tokenizer/writing/index.json', 'r', encoding='utf-8') as file:
    for each in json.load(file):
        tmp_dist['writing'].append(each['index'])

with open('index.json', 'w', encoding='utf-8') as file:
    file.write(json.dumps(tmp_dist, indent=4, ensure_ascii=False))
