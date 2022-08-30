import json
import requests
import threading
import os


items = []

with open('cache/tmp/url.json', 'r') as file:
    items = json.load(file)


class LoaderThread(threading.Thread):
    def __init__(self, begin, end):
        threading.Thread.__init__(self)
        self.begin = begin
        self.end = end
        self.tmp_dist = {}
        self.tmp_list = []
    
    def run(self)
        for i in range(self.begin, self.end):
            if i > 58 and i < 63:
                continue
            for j in range(1, 7):
                if i > 54 and j == 6:
                    break
                set_name = 'cache/set/' + str(i) + '-' + str(j) + '.json'
                src_name = 'cache/src/' + str(i) + '-' + str(j) + '.json'
                with open(set_name, 'r', encoding='utf-8') as file:
                    self.tmp_dist = json.load(file)
                with open(src_name, 'r', encoding='utf-8') as file:
                    self.tmp_list = json.load(file)
                self.load_txt(i, j)
                self.load_src(i, j)

    def load_txt(self, i, j):
        section = {'title': '', 'text': self.tmp_dist['text_en_us'], 'items': []}
        if i < 54:
            section['title'] = self.tmp_dist['title']
        else:
            section['title'] = items[i - 1][j - 1]['title']
        for tmp in self.tmp_list:
            item = {
                'caption': tmp['caption'], 'option': tmp['option'], 'answer': tmp['answer'],
                'src_cnt': len(tmp['src_link'])
            }
            section['items'].append(item)
        section_name = 'data/txt/' + str(i) + '-' + str(j) + '.json'
        with open(section_name, 'w', encoding='utf-8') as file:
            file.write(json.dumps(section, indent=4, ensure_ascii=False))

    def down_load(self, url, name):
        response = requests.get(url, stream=True)
        with open(name, 'wb') as file:
            for chunk in response.iter_content():
                file.write(chunk)

    def load_src(self, i, j):
        path = 'data/src/' + str(i) + '-' + str(j) + '/'
        os.makedirs(path)
        name = '0.mp3'
        self.down_load(self.tmp_dist['src_link'], path + name)
        section = 0
        for tmp in self.tmp_list:
            section += 1
            src_list = tmp['src_link']
            index = 0
            for src in src_list:
                index += 1
                name = str(section) + '-' + str(index) + '.mp3'
                self.down_load(src, path + name)


thread_1 = LoaderThread(1, 14)
thread_2 = LoaderThread(14, 27)
thread_3 = LoaderThread(27, 40)
thread_4 = LoaderThread(40, 53)
thread_5 = LoaderThread(53, 70)

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
