import re


class Util():
    def en_us_format(self, tmp):
        tmp = re.sub(r'[\s]+', ' ', tmp)
        tmp = tmp.replace('‘', '\'').replace('’', '\'').replace('`', '\'')
        tmp = tmp.replace('“', '"').replace('”', '"').replace('？', '?')
        tmp = tmp.replace('，', ',').replace('。', '.').replace('．', '.')
        tmp = tmp.replace('―', '---').replace('—', '---').replace('–', '---')
        tmp = tmp.replace('…', '...').replace('⋯', '...').strip()

        return tmp
    
    def zh_cn_format(self, tmp):
        return re.sub(r'\s', '', tmp)
    
    def list_format(self, tmp_list, lang, begin=0, end=0):
        res = []

        for tmp in tmp_list:
            tmp_str = tmp.strip()
            if len(tmp_str) == 0:
                continue
            tmp_str = tmp_str[begin:] if end == 0 else tmp_str[begin:end]
            if lang == 'en-us':
                tmp_str = self.en_us_format(tmp_str)
            elif lang == 'zh-cn':
                tmp_str = self.zh_cn_format(tmp_str)
            if len(tmp_str) > 0:
                res.append(tmp_str)

        return res
