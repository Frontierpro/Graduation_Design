import json
import requests
import threading


class LoaderThread(threading.Thread):
    def __init__(self, loader_list):
        threading.Thread.__init__(self)
        self.loader_list = loader_list
    
    def run(self):
        for loader in self.loader_list:
            txt_name = 'data/txt/' + str(loader['i']) + '-' + str(loader['j']) + '.json'
            src_name = 'data/src/' + str(loader['i']) + '.mp3'
            txt_dist = {'text': loader['text'], 'title': loader['title']}
            src_link = loader['url']
            self.load_txt(txt_name, txt_dist)
            if len(src_link) > 0:
                self.load_src(src_name, src_link)
        
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

for i in range(1, 70):
    if i > 58 and i < 63:
        continue
    for j in range(1, 3):
        if i == 9 and j == 1 or i == 14 and j == 1 or i == 24 and j == 1:
            continue
        name = 'cache/set/' + str(i) + '-' + str(j) + '.json'
        with open(name, 'r', encoding='utf-8') as file:
            tmp_dist = json.load(file)
        tmp = {
            'i': i, 'j': j, 'text': tmp_dist['text'], 'title': tmp_dist['title'], 'url': tmp_dist['src']
        }
        tmp_list.append(tmp)

thread_1 = LoaderThread(tmp_list[:32])
thread_2 = LoaderThread(tmp_list[32:64])
thread_3 = LoaderThread(tmp_list[64:96])
thread_4 = LoaderThread(tmp_list[96:])

thread_1.start()
thread_2.start()
thread_3.start()
thread_4.start()
thread_1.join()
thread_2.join()
thread_3.join()
thread_4.join()
