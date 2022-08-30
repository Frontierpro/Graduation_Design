import json
import copy
from itemadapter import ItemAdapter


class TMPPipeline:
    def open_spider(self, spider):
        if spider.name == 'TMP':
            self.urls = []
    
    def process_item(self, item, spider):
        if spider.name == 'TMP':
            self.urls.append(item['url'])
        return item
    
    def close_spider(self, spider):
        if spider.name == 'TMP':
            with open('cache/tmp/tmp.json', 'w') as file:
                file.write(json.dumps(self.urls, indent=4))


class URLPipeline:
    def open_spider(self, spider):
        if spider.name == 'URL':
            self.items = []
            for index in range(69):
                self.items.append([])
    
    def process_item(self, item, spider):
        if spider.name == 'URL':
            index = int(item['num']) - 1
            tmp = {'num': int(item['num']), 'code': item['code'], 'url': item['url']}
            self.items[index].append(tmp)
        return item
    
    def close_spider(self, spider):
        if spider.name == 'URL':
            with open('cache/tmp/url.json', 'w') as file:
                file.write(json.dumps(self.items, indent=4))


class SETPipeline:
    def open_spider(self, spider):
        if spider.name == 'SET':
            with open('cache/tmp/url.json', 'r') as file:
                self.items = json.load(file)

    def process_item(self, item, spider):
        if spider.name == 'SET':
            index = 1
            for each in self.items[int(item['num']) - 1]:
                if item['code'] == each['code']:
                    break
                index += 1
            tmp = {
                'title': item['title'], 'url_list': item['url_list'],
                'text_en_us': item['text_en_us'], 'text_zh_cn': item['text_zh_cn']
            }
            name = 'cache/set/' + str(int(item['num'])) + '-' + str(index) + '.json'
            with open(name, 'w', encoding='utf-8') as file:
                file.write(json.dumps(tmp, indent=4, ensure_ascii=False))
        return item


class SRCPipeline:
    def open_spider(self, spider):
        if spider.name == 'SRC':
            self.tmp_list = []
            sets = []
            for index in range(14):
                tmp = {'src_id': 0, 'caption': [], 'option': [], 'answer':[], 'highlight':[]}
                sets.append(tmp)
            section = []
            for index in range(3):
                section.append(copy.deepcopy(sets))
            for index in range(69):
                if index > 57 and index < 62:
                    self.tmp_list.append([])
                else:
                    self.tmp_list.append(copy.deepcopy(section))

            with open('cache/tmp/url.json', 'r') as file:
                self.items = json.load(file)
    
    def process_item(self, item, spider):
        if spider.name == 'SRC':
            set_num = int(item['num']) - 1
            id_num = int(item['src_id']) - 1
            index = 1
            for each in self.items[set_num]:
                if item['code'] == each['code']:
                    break
                index += 1
            self.tmp_list[set_num][index - 1][id_num]['src_id'] = int(item['src_id'])
            self.tmp_list[set_num][index - 1][id_num]['caption'] = item['caption']
            self.tmp_list[set_num][index - 1][id_num]['option'] = item['option']
            self.tmp_list[set_num][index - 1][id_num]['answer'] = item['answer']
            self.tmp_list[set_num][index - 1][id_num]['highlight'] = item['highlight']
        return item
    
    def close_spider(self, spider):
        if spider.name == 'SRC':
            for section in range(69):
                if section > 57 and section < 62:
                    continue
                for sets in range(3):
                    name = 'cache/src/' + str(section + 1) + '-' + str(sets + 1) + '.json'
                    if section == 25 and sets == 1:
                        print(self.tmp_list[section][sets])
                    with open(name, 'w', encoding='utf-8') as file:
                        tmp = self.tmp_list[section][sets]
                        if tmp[10]['src_id'] == 0:
                            file.write(json.dumps(tmp[:10], indent=4, ensure_ascii=False))
                        elif tmp[13]['src_id'] == 0:
                            file.write(json.dumps(tmp[:13], indent=4, ensure_ascii=False))
                        else:
                            file.write(json.dumps(tmp, indent=4, ensure_ascii=False))
