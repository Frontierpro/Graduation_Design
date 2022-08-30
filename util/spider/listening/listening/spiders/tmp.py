import scrapy
from listening.items import TMPItem


class TMP(scrapy.Spider):
    name = 'TMP'
    allowed_domains = ['liuxue.koolearn.com', 'top.zhan.com', 'toefl.kmf.com']
    start_urls = [
        'https://liuxue.koolearn.com/toefl/listen/',
        'https://top.zhan.com/toefl/listen/alltpo.html',
        'https://toefl.kmf.com/listen/ets/order/0'
    ]

    def parse(self, response):
        items = []

        xdf_filter = "//a[@class='style_search-order-btn__3uAag']/@href"
        zhan_filter = "//ul[@class='cssTopTitleList clearfix']//a[@class='sensors_maidian']/@href"
        kmf_filter = "//div[@class='filtrate-cont']/div[1]/div[@class='filtrate-btn']/a/@href"

        xdf_urls = response.xpath(xdf_filter).extract()
        zhan_urls = response.xpath(zhan_filter).extract()
        kmf_urls = response.xpath(kmf_filter).extract()

        for url in xdf_urls:
            item = TMPItem()
            item['url'] = 'https://liuxue.koolearn.com' + url
            items.append(item)
        items = items[3:5]

        for url in zhan_urls:
            item = TMPItem()
            item['url'] = url
            items.append(item)
        items = items[:3]
        
        for url in kmf_urls:
            item = TMPItem()
            item['url'] = 'https://toefl.kmf.com' + url
            items.append(item)

        return items
