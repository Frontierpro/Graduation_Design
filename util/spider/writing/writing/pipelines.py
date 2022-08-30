import json
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
            tmp = {
                'num': int(item['num']), 'code': item['code'], 'url': item['url']
            }
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
            tmp = {'src': item['src'], 'text': item['text'], 'title': item['title']}
            name = 'cache/set/' + str(int(item['num'])) + '-' + str(index) + '.json'
            with open(name, 'w', encoding='utf-8') as file:
                file.write(json.dumps(tmp, indent=4, ensure_ascii=False))
        return item
