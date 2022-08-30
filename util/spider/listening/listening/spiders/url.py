import scrapy
import json
from listening.items import URLItem


class URL(scrapy.Spider):
    name = 'URL'
    allowed_domains = ['liuxue.koolearn.com', 'top.zhan.com', 'toefl.kmf.com']
    start_urls = []

    def __init__(self):
        with open('cache/tmp/tmp.json', 'r') as file:
            self.start_urls = json.load(file)
    
    def parse(self, response):
        items = []

        xdf_num = response.xpath("//a[@class='style_question-title__3G3QD']/text()").extract()
        xdf_url = response.xpath("//a[@class='style_question-title__3G3QD']/@href").extract()

        zhan_num = response.xpath("//a[@class='md_click sensors_maidian cssReview']/@article_type").extract()
        zhan_code = response.xpath("//a[@class='md_click sensors_maidian cssReview']/@article_id").extract()
        zhan_title = response.xpath("//p[@class='cssEngTitle']/text()").extract()
        zhan_url = response.xpath("//a[@class='md_click sensors_maidian cssReview']/@href").extract()

        kmf_num = response.xpath("//a[@class='practice-title js-practice-title']/text()").extract()
        kmf_url = response.xpath("//a[@class='practice-title js-practice-title']/@href").extract()

        for index in range(len(xdf_num)):
            item = URLItem()
            item['url'] = 'https://liuxue.koolearn.com' + xdf_url[index]
            item['num'] = xdf_num[index].split()[1]
            item['code'] = xdf_num[index].split()[2] + xdf_num[index].split()[3]
            item['title'] = ''
            if int(item['num']) == 26 or int(item['num']) == 31:
                items.append(item)
        
        for index in range(len(zhan_num)):
            item = URLItem()
            item['url'] = zhan_url[index]
            item['num'] = zhan_num[index][8:]
            item['code'] = zhan_code[index]
            item['title'] = zhan_title[index]
            items.append(item)

        for index in range(len(kmf_num)):
            item = URLItem()
            item['url'] = 'https://toefl.kmf.com' + kmf_url[index]
            item['num'] = kmf_num[index].split()[1]
            item['code'] = kmf_num[index].split()[2] + kmf_num[index].split()[3]
            item['title'] = ''
            items.append(item)

        return items
