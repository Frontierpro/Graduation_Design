FEED_EXPORT_ENCODING = 'utf-8'

BOT_NAME = 'speaking'

SPIDER_MODULES = ['speaking.spiders']
NEWSPIDER_MODULE = 'speaking.spiders'

ROBOTSTXT_OBEY = False

ITEM_PIPELINES = {
    'speaking.pipelines.TMPPipeline': 300,
    'speaking.pipelines.URLPipeline': 301,
    'speaking.pipelines.SETPipeline': 302
}
