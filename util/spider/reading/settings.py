FEED_EXPORT_ENCODING = 'utf-8'

BOT_NAME = 'reading'

SPIDER_MODULES = ['reading.spiders']
NEWSPIDER_MODULE = 'reading.spiders'

ROBOTSTXT_OBEY = False

DOWNLOADER_MIDDLEWARES = {
    'reading.middlewares.SeleniumMiddleware': 543
}

ITEM_PIPELINES = {
    'reading.pipelines.TMPPipeline': 300,
    'reading.pipelines.URLPipeline': 301,
    'reading.pipelines.SETPipeline': 302,
    'reading.pipelines.SRCPipeline': 303
}
