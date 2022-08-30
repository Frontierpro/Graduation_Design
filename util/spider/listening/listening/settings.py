FEED_EXPORT_ENCODING = 'utf-8'

BOT_NAME = 'listening'

SPIDER_MODULES = ['listening.spiders']
NEWSPIDER_MODULE = 'listening.spiders'

ROBOTSTXT_OBEY = False

DOWNLOADER_MIDDLEWARES = {
    'listening.middlewares.SeleniumMiddleware': 543
}

ITEM_PIPELINES = {
    'listening.pipelines.TMPPipeline': 300,
    'listening.pipelines.URLPipeline': 301,
    'listening.pipelines.SETPipeline': 302,
    'listening.pipelines.SRCPipeline': 303
}
