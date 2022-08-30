import scrapy
import json
from speaking.items import SETItem
from speaking.utils import Util


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
            src_filter += "|//h3[@class='item-title js-player-record g-clearfix']/@data-url"
            kmf_src = response.xpath(src_filter).extract()

            tmp_list = response.xpath("//p[@class='text-show']/text()").extract()
            kmf_text = Util().list_format(tmp_list, 'en-us')

            tmp_filter = [
                "//h4[@class='item-sub-title']/text()",
                "//div[@class='item item-read']/p[@class='item-desc js-translate-new']/text()",
                "//div[@class='item item-question']/p[@class='item-desc js-translate-new']/text()"
            ]
            kmf_title = []
            for tmp in tmp_filter:
                tmp_list = Util().list_format(response.xpath(tmp).extract(), 'en-us')
                if len(tmp_list) > 0:
                    kmf_title.append(tmp_list)

            item = SETItem()
            item['num'] = kmf_num[0].split()[1]
            item['code'] = kmf_num[0].split()[2]
            item['src'] = kmf_src
            item['text'] = kmf_text
            item['title'] = kmf_title
            items.append(item)
        
        elif len(xdf_num) > 0:
            src_filter = "//div[@class='style_audio__1PNn4']//audio/@src"
            src_filter += "|//div[@class='style_stem-label__3fqf0']//audio/@src"
            xdf_src = response.xpath(src_filter).extract()

            tmp_list = response.xpath("//div[@class='style_section__2KVSg']/text()").extract()
            xdf_text = Util().list_format(tmp_list, 'en-us')

            tmp_filter = [
                "//div[@class='style_stem-text__3Vgg5']/p/b/text()",
                "//div[@class='style_stem-text__3Vgg5']/p/strong/text()",
                "//div[@class='style_stem-text__3Vgg5']/p/text()",
                "//div[@class='style_stem-text__3IwPp']/p/text()",
                "//div[@class='style_stem-text__3IwPp']/text()"
            ]
            xdf_title = []
            for tmp in tmp_filter:
                tmp_list = Util().list_format(response.xpath(tmp).extract(), 'en-us')
                if len(tmp_list) > 0:
                    xdf_title.append(tmp_list)
            
            item = SETItem()
            item['num'] = xdf_num[0].split()[1]
            item['code'] = xdf_num[0].split()[2] + xdf_num[0].split()[3]
            item['src'] = xdf_src
            item['text'] = xdf_text
            item['title'] = xdf_title
            items.append(item)
        
        else:
            zhan_code = response.xpath("//body/span[1]/@data-artid").extract()
            zhan_src = response.xpath("//input[@id='speaking_review']/@value").extract()

            tmp_list = response.xpath("//div[@class='audio_topic']/p/text()").extract()
            zhan_text = Util().list_format(tmp_list, 'en-us')

            tmp_filter = [
                "//span[@class='article_tit']/text()",
                "string(//div[@class='article']|//p[@class='article'])",
                "//p[@class='article ques']/text()",
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
