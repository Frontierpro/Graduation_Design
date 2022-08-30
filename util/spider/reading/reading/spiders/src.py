import scrapy
import json
from reading.items import SRCItem
from reading.utils import Util


class SRC(scrapy.Spider):
    name = 'SRC'
    allowed_domains = ['liuxue.koolearn.com', 'top.zhan.com', 'toefl.kmf.com']
    start_urls = []

    def __init__(self):
        for i in range(1, 70):
            if i > 58 and i < 63:
                continue
            for j in range(1, 4):
                name = 'cache/set/' + str(i) + '-' + str(j) + '.json'
                with open(name, 'r', encoding='utf-8') as file:
                    for each in json.load(file)['url_list']:
                        self.start_urls.append(each)
    
    def parse(self, response):
        items = []

        kmf_num = response.xpath("//div[@class='header-nav-link']/span/text()").extract()
        zhan_num = response.xpath("//div[@id='crumbs']/a[4]/text()").extract()
        xdf_num = response.xpath("//div[@class='style_wrapper__1prgW']/i/text()").extract()

        if len(kmf_num) > 0:
            id_filter = "//li[@class='question-lists js-question-lists  active ']/a/text()"
            kmf_id = response.xpath(id_filter).extract()

            caption_filter = "//p[@class='answer-detail bold']/text()|//p[@class='insert-desc']/text()"
            kmf_caption = response.xpath(caption_filter).extract()
            kmf_caption = Util().list_format(kmf_caption, 'en-us')
            if len(kmf_caption) == 0 or len(kmf_caption) == 2:
                tmp_str = response.xpath("string(//h3[@class='question-title'])").extract()[0]
                tmp_list = Util().list_format([tmp_str], 'en-us')
                kmf_caption = tmp_list + kmf_caption

            tmp_list = response.xpath("//li[@class='normal']/text()").extract()            
            kmf_option = Util().list_format(tmp_list, 'en-us')
            kmf_answer = []
            tmp_list = response.xpath("//span[@class='answer']/b/text()").extract()
            for tmp in tmp_list:
                kmf_answer.append(Util().en_us_format(tmp).split())

            item = SRCItem()
            item['num'] = kmf_num[0].split()[1]
            item['code'] = kmf_num[0].split()[2] + kmf_num[0].split()[3]
            item['src_id'] = kmf_id[0][1:]
            item['caption'] = kmf_caption
            item['option'] = kmf_option
            item['answer'] = kmf_answer
            item['highlight'] = []
            items.append(item)
        
        elif len(xdf_num) > 0:
            id_filter = "style_number__1iJZv style_detailNumber__17IG9 style_active__1-_QQ"
            id_filter = "//a[@class='" + id_filter + "']/text()"
            xdf_id = response.xpath(id_filter).extract()

            caption_filter = "//div[@class='style_stem__3ltpC']/b/text()"
            caption_filter += "|//div[@class='style_stem__3xFo7']//b/text()"
            xdf_caption = Util().list_format(response.xpath(caption_filter).extract(), 'en-us')
            if len(xdf_caption) == 0:
                caption_filter = "string(//div[@class='style_stem__31LLM']/p"
                caption_filter += "|//div[@class='style_stem__31LLM']|//div[@class='style_stem__3ltpC']/p)"
                tmp_str = response.xpath(caption_filter).extract()[0]
                xdf_caption = Util().list_format([tmp_str], 'en-us')
            
            option_filter = "//div[@class='style_options__1_1u2']//p[@class='style_label__OQPXt']/text()"
            option_filter += "|//p[@class='style_label__3vN_U']/text()"
            xdf_option = Util().list_format(response.xpath(option_filter).extract(), 'en-us')

            xdf_answer = []
            tmp_str = response.xpath("//div[@class='style_wrapper__1yHJn']//span/text()").extract()[0]
            tmp_list = Util().en_us_format(tmp_str).replace(' ', '').split(',')
            for tmp in tmp_list:
                tmp_answer = []
                for index in range(len(tmp)):
                    tmp_answer.append(tmp[index])
                xdf_answer.append(tmp_answer)
            
            item = SRCItem()
            item['num'] = xdf_num[0].split()[1]
            item['code'] = xdf_num[0].split()[2] + xdf_num[0].split()[3]
            item['src_id'] = xdf_id[1]
            item['caption'] = xdf_caption
            item['option'] = xdf_option
            item['answer'] = xdf_answer
            item['highlight'] = []
            items.append(item)
        
        else:
            zhan_code = response.xpath("//body/span[1]/@data-artid").extract()
            id_filter = "//li[@class='undone undone_currentpage bottom_mark']/text()"
            zhan_id = response.xpath(id_filter).extract()

            caption_filter = "//div[@class='botmbor']/div/text()|//p[@class='ops empis']/text()"
            zhan_caption = Util().list_format(response.xpath(caption_filter).extract(), 'en-us')
            if len(zhan_caption) == 0:
                tmp_list = response.xpath("//div[@class='left text dragcolor']/strong/text()").extract()
                zhan_caption = Util().list_format([' '.join(tmp_list)], 'en-us')
            if len(zhan_caption) == 0:
                tmp_str = response.xpath("string(//div[@class='left text'])").extract()[0]
                zhan_caption = Util().list_format([tmp_str[2:]], 'en-us')
            if len(zhan_caption) == 2:
                tmp_str = response.xpath("string(//div[@class='left text dragcolor'])").extract()[0]
                index = tmp_str.find('.')
                tmp_list = Util().list_format([tmp_str[index + 1:]], 'en-us')
                zhan_caption = tmp_list + zhan_caption
            
            option_filter = "//p[@class='ops dragsec ']/text()|//p[@class='ops dragsec']/text()"
            option_filter += "|//p[@class='ops sec']/label/text()"
            zhan_option = Util().list_format(response.xpath(option_filter).extract(), 'en-us', begin=2)

            zhan_answer = []
            tmp_str = response.xpath("//div[@class='left correctAnswer']/span/text()").extract()[0]
            tmp_list = Util().en_us_format(tmp_str).replace(' ', '').split(',')
            for tmp in tmp_list:
                tmp_answer = []
                for index in range(len(tmp)):
                    tmp_answer.append(tmp[index])
                zhan_answer.append(tmp_answer)
            
            item = SRCItem()
            item['num'] = zhan_num[0][8:-4]
            item['code'] = zhan_code[0]
            item['src_id'] = zhan_id[0]
            item['caption'] = zhan_caption
            item['option'] = zhan_option
            item['answer'] = zhan_answer
            item['highlight'] = []
            items.append(item)

        return items
