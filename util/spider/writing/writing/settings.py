FEED_EXPORT_ENCODING = 'utf-8'

BOT_NAME = 'writing'

SPIDER_MODULES = ['writing.spiders']
NEWSPIDER_MODULE = 'writing.spiders'

ROBOTSTXT_OBEY = False

ITEM_PIPELINES = {
    'writing.pipelines.TMPPipeline': 300,
    'writing.pipelines.URLPipeline': 301,
    'writing.pipelines.SETPipeline': 302
}
