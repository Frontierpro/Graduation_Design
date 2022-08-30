import scrapy
import json
from listening.items import SRCItem
from listening.utils import Util


class SRC(scrapy.Spider):
    name = 'SRC'
    allowed_domains = ['liuxue.koolearn.com', 'top.zhan.com', 'toefl.kmf.com']
    start_urls = []

    def __init__(self):
        for i in range(1, 70):
            if i > 58 and i < 63:
                continue
            for j in range(1, 7):
                if i > 54 and j == 6:
                    break
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
            id_filter = "//li[@class='question-lists js-question-lists  active  ']/text()"
            kmf_id = response.xpath(id_filter).extract()

            src_filter = "//div[@class='question-topic']/@data-preaudio"
            src_filter += "|//div[@class='question-title']/div/@data-url"
            kmf_src = response.xpath(src_filter).extract()

            caption_filter = "//span[@class='question-detail']/text()"
            caption_filter += "|//div[@class='question-title']/text()"
            tmp_list = response.xpath(caption_filter).extract()
            kmf_caption = Util().list_format(tmp_list, 'en-us')

            tmp_list = response.xpath("//p[@class='question-list-detail']/text()").extract()
            kmf_option = Util().list_format(tmp_list, 'en-us')
            if len(kmf_option) == 0:
                tmp_list = response.xpath("//tr[@class='top-title']/td/text()").extract()
                kmf_option.append(Util().list_format(tmp_list, 'en-us'))
                tmp_list = response.xpath("//td[@class='main-list-left']/text()").extract()
                kmf_option.append(Util().list_format(tmp_list, 'en-us'))

            tmp_str = response.xpath("//span[@class='true-answer answer-hide']/text()").extract()[0]
            tmp_str = tmp_str[tmp_str.find(':') + 1:]
            kmf_answer = tmp_str.split()

            item = SRCItem()
            item['num'] = kmf_num[0].split()[1]
            item['code'] = kmf_num[0].split()[2] + kmf_num[0].split()[3]
            item['src_id'] = kmf_id[0][1:]
            item['src_link'] = kmf_src
            item['caption'] = kmf_caption
            item['option'] = kmf_option
            item['answer'] = kmf_answer
            items.append(item)
        
        elif len(xdf_num) > 0:
            id_filter = "style_number__1iJZv style_detailNumber__17IG9 style_active__1-_QQ"
            id_filter = "//a[@class='" + id_filter + "']/text()"
            xdf_id = response.xpath(id_filter).extract()

            src_filter = "//div[@class='style_horn__1iW3o style_horn__dc54h']/audio/@src"
            xdf_src = response.xpath(src_filter).extract()

            caption_filter = "//div[@class='style_stem__31LLM']/text()"
            caption_filter += "|//div[@class='style_stem__1oDGL']/text()"
            caption_filter += "|//div[@class='style_stem__31LLM style_repeat__2UkDu']/text()"
            xdf_caption = Util().list_format(response.xpath(caption_filter).extract(), 'en-us')

            tmp_list = response.xpath("//p[@class='style_label__3vN_U']/text()").extract()
            xdf_option = Util().list_format(tmp_list, 'en-us')
            if len(xdf_option) == 0:
                th_filter = "//table[@class='style_table__3oOAF']//th/text()"
                td_filter = "//table[@class='style_table__3oOAF']//td/text()"
                xdf_option.append(Util().list_format(response.xpath(th_filter).extract(), 'en-us'))
                xdf_option.append(Util().list_format(response.xpath(td_filter).extract(), 'en-us'))

            xdf_answer = []
            answer_filter = "//p[@class='style_key__3K_c7 style_notResult__235il']/span/text()"
            tmp_str = response.xpath(answer_filter).extract()[0]
            for index in range(len(tmp_str)):
                xdf_answer.append(tmp_str[index])

            item = SRCItem()
            item['num'] = xdf_num[0].split()[1]
            item['code'] = xdf_num[0].split()[2] + xdf_num[0].split()[3]
            item['src_id'] = xdf_id[1]
            item['src_link'] = xdf_src
            item['caption'] = xdf_caption
            item['option'] = xdf_option
            item['answer'] = xdf_answer
            items.append(item)
        
        else:
            zhan_code = response.xpath("//body/span[1]/@data-artid").extract()
            id_filter = "//li[@class='undone undone_currentpage bottom_mark']/text()"
            zhan_id = response.xpath(id_filter).extract()
            
            begin = response.text.find('$("#listen_relisten_audio").jPlayer')
            begin = response.text.find('mp3:"', begin) + 5
            end = response.text.find('"', begin)
            tmp_str = response.text[begin:end]
            zhan_src = [] if len(tmp_str) == 0 else [tmp_str]

            tmp_list = response.xpath("string(//div[@class='left text'])").extract()
            zhan_caption = Util().list_format(tmp_list, 'en-us', begin=2)

            tmp_list = response.xpath("//div[@class='question_option']//label/text()").extract()
            zhan_option = Util().list_format(tmp_list, 'en-us', begin=2)
            if len(zhan_option) == 0:
                tmp_list = response.xpath("//td/div[@class='name']/text()").extract()
                zhan_option.append(Util().list_format(tmp_list, 'en-us'))
                tmp_list = response.xpath("//td/div[@class='ops']/text()").extract()
                zhan_option.append(Util().list_format(tmp_list, 'en-us'))

            zhan_answer = []
            tmp_str = response.xpath("//div[@class='left correctAnswer']/span/text()").extract()[0]
            for index in range(len(tmp_str)):
                zhan_answer.append(tmp_str[index])

            item = SRCItem()
            item['num'] = zhan_num[0][8:-4]
            item['code'] = zhan_code[0]
            item['src_id'] = zhan_id[0]
            item['src_link'] = zhan_src
            item['caption'] = zhan_caption
            item['option'] = zhan_option
            item['answer'] = zhan_answer
            items.append(item)

        return items
