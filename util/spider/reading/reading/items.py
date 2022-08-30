import scrapy


class TMPItem(scrapy.Item):
    url = scrapy.Field()


class URLItem(scrapy.Item):
    url = scrapy.Field()
    num = scrapy.Field()
    code = scrapy.Field()


class SETItem(scrapy.Item):
    num = scrapy.Field()
    code = scrapy.Field()
    title = scrapy.Field()
    url_list = scrapy.Field()
    text_en_us = scrapy.Field()
    text_zh_cn = scrapy.Field()


class SRCItem(scrapy.Item):
    num = scrapy.Field()
    code = scrapy.Field()
    src_id = scrapy.Field()
    caption = scrapy.Field()
    option = scrapy.Field()
    answer = scrapy.Field()
    highlight = scrapy.Field()
