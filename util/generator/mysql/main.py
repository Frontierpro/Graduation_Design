import json


sql = 'USE tpo;\n'

for i in range(1, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 4):
        name = '../../spider/reading/reading/data/' + str(i) + '-' + str(j) + '.json'
        with open(name, 'r', encoding='utf-8') as file:
            sql += 'INSERT INTO reading (section, id, dist) VALUES (' + str(i) + ', ' + str(j) + ', '
            tmp = json.dumps(json.load(file), ensure_ascii=False)
            sql += '\'' + tmp.replace('\'', '\\\'').replace('\\"', '\\\\\\\"') + '\');\n'

with open('reading.sql', 'w', encoding='utf-8') as file:
    file.write(sql)


sql = 'USE tpo;\n'

for i in range(1, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 7):
        if i > 54 and j == 6:
            break
        name = '../../spider/listening/listening/data/txt/' + str(i) + '-' + str(j) + '.json'
        with open(name, 'r', encoding='utf-8') as file:
            sql += 'INSERT INTO listening (section, id, dist) VALUES (' + str(i) + ', ' + str(j) + ', '
            tmp = json.dumps(json.load(file), ensure_ascii=False)
            sql += '\'' + tmp.replace('\'', '\\\'').replace('\\"', '\\\\\\\"') + '\');\n'

with open('listening.sql', 'w', encoding='utf-8') as file:
    file.write(sql)


sql = 'USE tpo;\n'

for i in range(1, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 5):
        name = '../../spider/speaking/speaking/data/txt/' + str(i) + '-' + str(j) + '.json'
        with open(name, 'r', encoding='utf-8') as file:
            sql += 'INSERT INTO speaking (section, id, dist) VALUES (' + str(i) + ', ' + str(j) + ', '
            tmp = json.dumps(json.load(file), ensure_ascii=False)
            sql += '\'' + tmp.replace('\'', '\\\'').replace('\\"', '\\\\\\\"') + '\');\n'

with open('speaking.sql', 'w', encoding='utf-8') as file:
    file.write(sql)


sql = 'USE tpo;\n'

for i in range(1, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 3):
        name = '../../spider/writing/writing/data/txt/' + str(i) + '-' + str(j) + '.json'
        with open(name, 'r', encoding='utf-8') as file:
            sql += 'INSERT INTO writing (section, id, dist) VALUES (' + str(i) + ', ' + str(j) + ', '
            tmp = json.dumps(json.load(file), ensure_ascii=False)
            sql += '\'' + tmp.replace('\'', '\\\'').replace('\\"', '\\\\\\\"') + '\');\n'

with open('writing.sql', 'w', encoding='utf-8') as file:
    file.write(sql)
