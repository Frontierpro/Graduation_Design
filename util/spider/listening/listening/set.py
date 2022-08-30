import scrapy
import json
from listening.items import SETItem
from listening.utils import Util


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
        xdf_num = response.xpath("//div[@class='style_wrapper__1prgW']/i/text()").extract()

        if len(kmf_num) > 0:
            kmf_title = response.xpath("//h1[@class='i-title js-top-title']/text()").extract()

            kmf_url = []
            tmp_list = response.xpath("//ul[@class='question-tab g-clearfix']/li/@data-href").extract()
            for tmp in tmp_list:
                kmf_url.append('https://toefl.kmf.com' + tmp)
            kmf_src = response.xpath("//div[@class='audio-cont']/div/@data-url").extract()

            tmp_list = response.xpath("//p[@class='article-detail-en']/text()").extract()
            kmf_text_en_us = Util().list_format(tmp_list, 'en-us')
            tmp_list = response.xpath("//p[@class='article-detail-cn']/text()").extract()
            kmf_text_zh_cn = Util().list_format(tmp_list, 'zh-cn')

            item = SETItem()
            item['num'] = kmf_num[0].split()[1]
            item['code'] = kmf_num[0].split()[2] + kmf_num[0].split()[3]
            item['title'] = kmf_title[0]
            item['url_list'] = kmf_url
            item['src_link'] = kmf_src[0]
            item['text_en_us'] = kmf_text_en_us
            item['text_zh_cn'] = kmf_text_zh_cn
            items.append(item)
        
        elif len(xdf_num) > 0:       
            src_filter = "//div[@class='style_audio__3CZIP style_audio__21IF7']/audio/@src"
            text_filter = "//div[@class='style_dictionary-wrap__R_j-u']"
            text_en_us_filter = text_filter + "//p[@class='en']/text()"
            text_zh_cn_filter = text_filter + "//p[@class='style_cn__3fU7p']/text()"

            xdf_url = []
            tmp_list = response.xpath("//div[@class='style_number-bar__v2hu8']//a/@href").extract()
            for tmp in tmp_list:
                xdf_url.append('https://liuxue.koolearn.com' + tmp)
            xdf_src = response.xpath(src_filter).extract()

            tmp_list = response.xpath(text_en_us_filter).extract()
            xdf_text_en_us = Util().list_format(tmp_list, 'en-us')
            tmp_list = response.xpath(text_zh_cn_filter).extract()
            xdf_text_zh_cn = Util().list_format(tmp_list, 'zh-cn')

            item = SETItem()
            item['num'] = xdf_num[0].split()[1]
            item['code'] = xdf_num[0].split()[2] + xdf_num[0].split()[3]
            item['title'] = ''
            item['url_list'] = xdf_url
            item['src_link'] = xdf_src[0]
            item['text_en_us'] = xdf_text_en_us
            item['text_zh_cn'] = xdf_text_zh_cn
            items.append(item)
        
        else:
            zhan_code = response.xpath("//body/span[1]/@data-artid").extract()
            zhan_url = response.xpath("//div[@id='footer_review']//a/@href").extract()

            begin = response.text.find('$("#listen_review_audio").jPlayer')
            begin = response.text.find('mp3:"', begin) + 5
            end = response.text.find('"', begin)
            zhan_src = response.text[begin:end]

            tmp_list = response.xpath("//span[@class='text']/text()").extract()
            zhan_text_en_us = Util().list_format(tmp_list, 'en-us')
            tmp_list = response.xpath("//span[@class='phase']/@data-translation").extract()
            zhan_text_zh_cn = Util().list_format(tmp_list, 'zh-cn')

            item = SETItem()
            item['num'] = zhan_num[0][8:-4]
            item['code'] = zhan_code[0]
            item['title'] = ''
            item['url_list'] = zhan_url
            item['src_link'] = zhan_src
            item['text_en_us'] = zhan_text_en_us
            item['text_zh_cn'] = zhan_text_zh_cn
            items.append(item)

        return items
