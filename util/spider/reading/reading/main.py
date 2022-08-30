import json


tmp_dist = {}
tmp_list = []


def get_txt(i, j):
    section = {'title': tmp_dist['title'], 'text': tmp_dist['text_en_us'], items: []}
    for tmp in tmp_list:
        item = {'caption': tmp['caption'], 'option': tmp['option'], 'answer': tmp['answer'], 'highlight': []}
        section['items'].append(item)
    section_name = 'data/' + str(i) + '-' + str(j) + '.json'
    with open(section_name, 'w', encoding='utf-8') as file:
        file.write(json.dumps(section, indent=4, ensure_ascii=False))


for i in range(1, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 4):
        set_name = 'cache/set/' + str(i) + '-' + str(j) + '.json'
        src_name = 'cache/src/' + str(i) + '-' + str(j) + '.json'
        with open(set_name, 'r', encoding='utf-8') as file:
            tmp_dist = json.load(file)
        with open(src_name, 'r', encoding='utf-8') as file:
            tmp_list = json.load(file)
