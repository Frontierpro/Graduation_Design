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
    src = scrapy.Field()
    text = scrapy.Field()
    title = scrapy.Field()
