import scrapy
import json
from writing.items import SETItem
from writing.utils import Util


class SET(scrapy.Spider):
    name = 'SET'
    allowed_domains = ['liuxue.koolearn.com', 'top.zhan.com', 'toefl.kmf.com']
    start_urls = []

    def __init__(self):
        with open('cache/tmp/url.json', 'r') as file:
            for tmp_list in json.load(file):
                for tmp in tmp_list:
                    self.start_urls.append(tmp['url'])
    
    def parse(self, response):
        items = []

        kmf_num = response.xpath("//div[@class='header-nav-link']/span/text()").extract()
        zhan_num = response.xpath("//div[@id='crumbs']/a[4]/text()").extract()
        xdf_num = response.xpath("//div[@class='style_wrapper__224b_ undefined']/text()").extract()
        
        if len(kmf_num) > 0:
            src_filter = "//div[@class='g-player-control video-left-content js-player-record']/@data-url"
            kmf_src = response.xpath(src_filter).extract()

            tmp_list = response.xpath("//div[@class='item-article']/text()").extract()
            kmf_text = Util().list_format(tmp_list, 'en-us')

            tmp_filter = [
                "//div[@class='content-read-data']//p/text()",
                "//div[@class='question-cont']//p/text()"
            ]
            kmf_title = []
            for tmp in tmp_filter:
                tmp_list = Util().list_format(response.xpath(tmp).extract(), 'en-us')
                if len(tmp_list) > 0:
                    kmf_title.append(tmp_list)

            item = SETItem()
            item['num'] = kmf_num[0].split()[1]
            item['code'] = kmf_num[0].split()[2] + kmf_num[0].split()[3]
            item['src'] = '' if len(kmf_src) == 0 else kmf_src[0]
            item['text'] = kmf_text
            item['title'] = kmf_title
            items.append(item)
        
        elif len(xdf_num) > 0:
            src_filter = "//div[@class='style_audio__1PNn4']//audio/@src"
            xdf_src = response.xpath(src_filter).extract()

            tmp_list = response.xpath("//div[@class='style_lyric__1ZpBK']/text()").extract()
            xdf_text = Util().list_format(tmp_list, 'en-us')

            tmp_filter = [
                "//div[@class='style_stem-text__3Vgg5']/p/text()",
                "//div[@class='style_stem-text__3IwPp']/text()",
                "//div[@class='style_stem-text__3IwPp']/strong/text()",
                "//div[@class='style_stem-text__3IwPp']/p/text()"
            ]
            xdf_title = []
            for tmp in tmp_filter:
                tmp_list = Util().list_format(response.xpath(tmp).extract(), 'en-us')
                if len(tmp_list) > 0:
                    xdf_title.append(tmp_list)
            
            item = SETItem()
            item['num'] = xdf_num[0].split()[1]
            item['code'] = xdf_num[0].split()[2] + xdf_num[0].split()[3]
            item['src'] = '' if len(xdf_src) == 0 else xdf_src[0]
            item['text'] = xdf_text
            item['title'] = xdf_title
            items.append(item)
        
        else:
            zhan_code = response.xpath("//body/span[1]/@data-artid").extract()
            zhan_src = ''
            begin = response.text.find('$("#listen_review_audio").jPlayer')
            if begin >= 0:
                begin = response.text.find('mp3: "', begin) + 6
                end = response.text.find('"', begin)
                zhan_src = response.text[begin:end]

            text_filter = "//div[@class='audio_topic']/text()"
            text_filter += "|//div[@class='audio_topic']/p/text()"
            text_filter += "|//div[@class='audio_topic']//span/text()"
            zhan_text = Util().list_format(response.xpath(text_filter).extract(), 'en-us')

            tmp_filter = [
                "//div[@class='article']/text()",
                "//div[@class='article']//b/text()",
                "//div[@class='article']/span/text()",
                "//div[@class='tigan']/text()",
            ]
            zhan_title = []
            for tmp in tmp_filter:
                tmp_list = Util().list_format(response.xpath(tmp).extract(), 'en-us')
                if len(tmp_list) > 0:
                    zhan_title.append(tmp_list)

            item = SETItem()
            item['num'] = zhan_num[0][8:-4]
            item['code'] = zhan_code[0]
            item['src'] = zhan_src
            item['text'] = zhan_text
            item['title'] = zhan_title
            items.append(item)
        
        return items
