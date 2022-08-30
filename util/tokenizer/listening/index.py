import json


tmp_list = []

for i in range(1, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 7):
        if i > 54 and j == 6:
            break
        name = 'token/' + str(i) + '-' +str(j) + '.json'
        with open(name, 'r', encoding='utf-8') as file:
            for each in json.load(file):
                title = 'TPO ' + str(i) + ' '
                if j == 1 or j == 4:
                    title += 'Conversation ' + str(j // 3 + 1)
                else:
                    title += 'Lecture ' + str(2 * ((j - 1) // 3) + (j - 1) % 3)
                tmp_list.append([each[0], title])

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
