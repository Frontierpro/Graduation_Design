import threading
import json
import math
import re


txt_list = []

def get_txt(dir_name):
    with open(dir_name, 'r', encoding='utf-8') as file:
        tmp_dist = json.load(file)
        tmp = (' '.join(tmp_dist['text']))
        for each in tmp_dist['title']:
            tmp += ' ' + ' '.join(each)
        tmp = re.sub(r'\W', ' ', tmp)
        tmp = re.sub(r'[\s]+', ' ', tmp)
        return tmp.lower().strip()

for i in range(1, 70):
    if i > 58 and i < 63:
        txt_list.append([])
        continue
    tmp_list = []
    for j in range(1, 3):
        dir_name = '../../spider/writing/writing/data/txt/'
        dir_name += str(i) + '-' + str(j) + '.json'
        tmp_list.append(get_txt(dir_name))
    txt_list.append(tmp_list)


class TF_IDF_Thread(threading.Thread):
    def __init__(self, begin, end):
        threading.Thread.__init__(self)
        self.begin = begin
        self.end = end
    
    def run(self):
        for index in range(self.begin, self.end):
            if index > 58 and index < 63:
                continue
            for cnt in range(1, 3):
                res_list = self.get_tfidf(self.get_token(index, cnt))
                top = int(0.3 * len(res_list))
                name = 'token/' + str(index) + '-' + str(cnt) + '.json'
                with open(name, 'w', encoding='utf-8') as file:
                    file.write(json.dumps(res_list[:top], indent=4, ensure_ascii=False))

    def get_token(self, i, j):
        token_list = []
        tmp_list = txt_list[i - 1][j - 1].split(' ')
        total = len(tmp_list)
        tmp_list.sort()
        pre = ''
        cnt = 0
        for tmp in tmp_list:
            if pre == tmp:
                token_list[len(token_list) - 1][1] += 1
            else:
                pre = tmp
                token_list.append([tmp, 1])
        for index in range(len(token_list)):
            token_list[index][1] /= total
        return token_list

    def get_idf(self, token):
        cnt = 1
        for i in range(1, 70):
            if i > 58 and i < 63:
                continue
            for j in range(1, 3):
                if txt_list[i - 1][j - 1].find(token) >= 0:
                    cnt += 1
        return math.log(195 / cnt, 10)

    def get_tfidf(self, token_list):
        tmp_list = []
        for token in token_list:
            tmp_list.append([token[0], token[1] * self.get_idf(token[0])])
        return sorted(tmp_list, key=lambda item:item[1], reverse=True)


thread_1 = TF_IDF_Thread(1, 14)
thread_2 = TF_IDF_Thread(14, 27)
thread_3 = TF_IDF_Thread(27, 40)
thread_4 = TF_IDF_Thread(40, 53)
thread_5 = TF_IDF_Thread(53, 70)

thread_1.start()
thread_2.start()
thread_3.start()
thread_4.start()
thread_5.start()
thread_1.join()
thread_2.join()
thread_3.join()
thread_4.join()
thread_5.join()
