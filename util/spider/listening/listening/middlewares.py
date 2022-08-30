from selenium import webdriver
from scrapy.http import HtmlResponse


class SeleniumMiddleware:
    def __init__(self):
        self.options = webdriver.ChromeOptions()
        self.options.add_argument("--headless")
    
    def process_request(self, request, spider):
        if spider.name == 'SET' and request.url[0:28] == 'https://liuxue.koolearn.com/':
            driver = webdriver.Chrome(options=self.options, executable_path='C:/chrome/chromedriver')
            driver.get(request.url)
            driver.find_element_by_class_name('style_switch__xzj0q').click()
            driver.implicitly_wait(2)
            src = driver.page_source
            driver.quit()
            return HtmlResponse(url=request.url, body=src, request=request, encoding='utf-8')
        else:
            return None
