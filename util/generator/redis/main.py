import json

tmp_list = []

with open('../../tokenizer/reading/index.json', 'r', encoding='utf-8') as file:
    for each in json.load(file):
        for item in each['list']:
            tmp_list.append('SADD reading_' + each['index'] + ' ' + item.replace(' ', '_'))

with open('../../tokenizer/listening/index.json', 'r', encoding='utf-8') as file:
    for each in json.load(file):
        for item in each['list']:
            tmp_list.append('SADD listening_' + each['index'] + ' ' + item.replace(' ', '_'))

with open('../../tokenizer/speaking/index.json', 'r', encoding='utf-8') as file:
    for each in json.load(file):
        for item in each['list']:
            tmp_list.append('SADD speaking_' + each['index'] + ' ' + item.replace(' ', '_'))

with open('../../tokenizer/writing/index.json', 'r', encoding='utf-8') as file:
    for each in json.load(file):
        for item in each['list']:
            tmp_list.append('SADD writing_' + each['index'] + ' ' + item.replace(' ', '_'))

with open('init', 'w', encoding='utf-8') as file:
    for tmp in tmp_list:
        file.write(tmp + '\n')
