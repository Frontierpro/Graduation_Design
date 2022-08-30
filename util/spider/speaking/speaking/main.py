import json
import requests
import threading
import os


class LoaderThread(threading.Thread):
    def __init__(self, loader_list):
        threading.Thread.__init__(self)
        self.loader_list = loader_list
    
    def run(self):
        for loader in self.loader_list:
            txt_name = 'data/txt/' + str(loader['i']) + '-' + str(loader['j']) + '.json'
            txt_dist = {'text': loader['text'], 'title': loader['title']}
            self.load_txt(txt_name, txt_dist)
            path = 'data/src/' + str(loader['i']) + '/'
            if not os.path.exists(path):
                os.makedirs(path)
            src_list = loader['url']
            index = 0
            for src_link in src_list:
                src_name = path + str(loader['j']) + index + '.mp3'
                self.load_src(src_name, src_link)
                index += 1
        
    def load_txt(self, txt_name, txt_dist):
        with open(txt_name, 'w', encoding='utf-8') as file:
            file.write(json.dumps(txt_dist, indent=4, ensure_ascii=False))
    
    def load_src(self, src_name, src_link):
        response = requests.get(src_link, stream=True)
        with open(src_name, 'wb') as file:
            for chunk in response.iter_content():
                file.write(chunk)


tmp_list = []
tmp_dist = {}

for i in range(63, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 5):
        if i == 8 and j == 4 or i == 63 and j == 3:
            continue
        name = 'cache/set/' + str(i) + '-' + str(j) + '.json'
        with open(name, 'r', encoding='utf-8') as file:
            tmp_dist = json.load(file)
        tmp = {
            'i': i, 'j': j, 'text': tmp_dist['text'], 'title': tmp_dist['title'], 'url': tmp_dist['src']
        }
        tmp_list.append(tmp)

thread_1 = LoaderThread(tmp_list[:65])
thread_2 = LoaderThread(tmp_list[65:130])
thread_3 = LoaderThread(tmp_list[130:195])
thread_4 = LoaderThread(tmp_list[195:])

thread_1.start()
thread_2.start()
thread_3.start()
thread_4.start()
thread_1.join()
thread_2.join()
thread_3.join()
thread_4.join()
