import scrapy
import json
import re
from scrapy.selector import Selector
from reading.items import SETItem
from reading.utils import Util


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
            url_filter = "//div[@class='left-cont fl']//a[@class='question-link']/@href"
            tmp_list = response.xpath(url_filter).extract()
            for tmp in tmp_list:
                kmf_url.append('https://toefl.kmf.com' + tmp)

            kmf_text_en_us = []            
            tmp_list = response.xpath("//div[@class='i-stem-stem js-translate-new']/p")
            for tmp in tmp_list:
                text_en_us = Util().en_us_format(tmp.xpath('string(.)').extract()[0])
                if len(text_en_us) > 0:
                    kmf_text_en_us.append(' ' + text_en_us + ' ')

            text_filter = "//li[@class='article-box js-article-box translation']/text()"
            tmp_list = response.xpath(text_filter).extract()
            kmf_text_zh_cn = Util().list_format(tmp_list, 'zh-cn')

            item = SETItem()
            item['num'] = kmf_num[0].split()[1]
            item['code'] = kmf_num[0].split()[2] + kmf_num[0].split()[3]
            item['title'] = kmf_title[0]
            item['url_list'] = kmf_url
            item['text_en_us'] = kmf_text_en_us
            item['text_zh_cn'] = kmf_text_zh_cn
            items.append(item)
        
        elif len(xdf_num) > 0:
            title_filter = "//h2[@class='stem-section']//b/text()|//h2[@class='stem-section']//strong/text()"
            xdf_title = response.xpath(title_filter).extract()

            xdf_url = []
            tmp_list = response.xpath("//div[@class='style_number-bar__v2hu8']//a/@href").extract()
            for tmp in tmp_list:
                xdf_url.append('https://liuxue.koolearn.com' + tmp)
            
            xdf_text_en_us = []
            for section in response.xpath("//p[@class='stem-section']"):
                section_en_us = ''
                for text in section.xpath("./span[@class='style_translate-sentence__1Iprx']"):
                    tmp = text.xpath("string(./span[@class='style_section-cn__2Xn9B'])").extract()[0]
                    text_en_us = text.xpath('string(.)').extract()[0]
                    text_en_us = text_en_us.replace(tmp, ' ')
                    text_en_us = re.sub(r'\[[\s]*■[\s]*\]', ' ', text_en_us)
                    section_en_us += text_en_us
                section_en_us = Util().en_us_format(section_en_us)
                if len(section_en_us) > 0:
                    xdf_text_en_us.append(' ' + section_en_us + ' ')
            
            tmp_list = response.xpath("//p/span[@class='style_p-translate__nIpM-']/text()").extract()
            xdf_text_zh_cn = Util().list_format(tmp_list, 'zh-cn')
            
            item = SETItem()
            item['num'] = xdf_num[0].split()[1]
            item['code'] = xdf_num[0].split()[2] + xdf_num[0].split()[3]
            item['title'] = xdf_title[0]
            item['url_list'] = xdf_url
            item['text_en_us'] = xdf_text_en_us
            item['text_zh_cn'] = xdf_text_zh_cn
            items.append(item)
        
        else:
            zhan_code = response.xpath("//body/span[1]/@data-artid").extract()
            zhan_title = response.xpath("//span[@class='article_tit']/text()").extract()
            zhan_url = response.xpath("//div[@id='footer_review']//a/@href").extract()

            zhan_text_en_us = []
            zhan_text_zh_cn = []
            tmp_str = re.sub(r'<[^>]*div[^>]*>', '', response.xpath("//div[@class='article']").get())
            tmp_list = tmp_str.split('<br><br>')

            for tmp in tmp_list:
                text_en_us = Util().en_us_format(Selector(text=tmp).xpath('string(.)').extract()[0])
                if len(text_en_us) > 0:
                    zhan_text_en_us.append(' ' + text_en_us + ' ')
                text_filter = "//span[@class='phase']/@data-translation"
                text_zh_cn = ''.join(Selector(text=tmp).xpath(text_filter).extract())
                text_zh_cn = re.sub(r'<[^>]*>', '', Util().zh_cn_format(text_zh_cn))
                if len(text_zh_cn):
                    zhan_text_zh_cn.append(text_zh_cn)

            item = SETItem()
            item['num'] = zhan_num[0][8:-4]
            item['code'] = zhan_code[0]
            item['title'] = zhan_title[0]
            item['url_list'] = zhan_url
            item['text_en_us'] = zhan_text_en_us
            item['text_zh_cn'] = zhan_text_zh_cn
            items.append(item)
        
        return items
