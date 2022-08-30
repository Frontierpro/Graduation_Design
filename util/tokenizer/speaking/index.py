import json


tmp_list = []

for i in range(1, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 5):
        name = 'token/' + str(i) + '-' +str(j) + '.json'
        with open(name, 'r', encoding='utf-8') as file:
            for each in json.load(file):
                tmp_list.append([each[0], 'TPO ' + str(i) + ' Task ' + str(j)])

tmp_list = sorted(tmp_list, key=lambda item:item[0])


index_list = []

pre = ''
for tmp in tmp_list:
    if pre == tmp[0]:
        index_list[len(index_list) - 1]['list'].append(tmp[1])
    else:
        index_list.append({'index': tmp[0], 'list': [tmp[1]]})
        pre = tmp[0]

with open('index.json', 'w', encoding='utf-8') as file:
    file.write(json.dumps(index_list, indent=4, ensure_ascii=False))
