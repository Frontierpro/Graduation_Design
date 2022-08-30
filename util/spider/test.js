var fs = require('fs')

var i = 57
var j = 1
var textName = 'reading/reading/data/text/' + i + '-' + j + '.json'
var itemName = 'reading/reading/data/item/' + i + '-' + j + '.json'
var indexName = 'reading/reading/data/index.json'
var textJson, itemJson

fs.readFile(textName, 'utf-8', function(err, data) {
    textJson = JSON.parse(data)['text_en_us']
    fs.readFile(itemName, 'utf-8', function(err, data) {
        itemJson = JSON.parse(data)
        fs.readFile(indexName, 'utf-8', function(err, data) {
            index = 3 * (i - 1) + j - 1
            if (index > 185)
                index -= 12
            
            console.log(JSON.parse(data)[index]['title'] + '-' + j)
            console.log(JSON.parse(data)[index]['title_zh_cn'])
            console.log(JSON.parse(data)[index]['title_en_us'])
            console.log('====================================')

            for (index = 0; index < itemJson.length; index++) {
                console.log(itemJson[index]['num'])
                console.log('')

                if (itemJson[index]['answer'].length > 1) {
                    console.log('Drag your answer choices to the spaces where they belong. To remove an answer choice, click on it.To review the passage, click VIEW TEXT.')
                }
                else if (itemJson[index]['answer'][0].length == 3) {
                    console.log('Directions: An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage. Some sentences do not belong in the summary because they express that are not presented in the passage or are minor ideas in the passage. This question is worth 2 points.')
                    console.log('Drag your answer choices to the spaces where they belong. To remove an answer choice, click on it.To review the passage, click VIEW TEXT.')
                }
                else if (itemJson[index]['answer'][0].length == 2) {
                    console.log('Click on 2 answers')
                }
                else if (itemJson[index]['highlight'].length == 4) {
                    console.log('Look at the four squares [■] that indicate where the following sentence could be added to the passage. Where would the sentence best fit?')
                    console.log('Where would the sentence best fit? Click on a square [■] to add the sentence to the passage. To select a different location，click on a different square.')
                }
                else
                    console.log('Click on an oval to select your answer. To choose a different answer, click one different oval.')
                for (k = 0; k < itemJson[index]['caption'].length; k++)
                    console.log(itemJson[index]['caption'][k])
                console.log('')

                for (k = 0; k < itemJson[index]['option'].length; k++)
                    console.log(itemJson[index]['option'][k])
                if (itemJson[index]['option'].length > 0)
                    console.log('')

                for (k = 0; k < itemJson[index]['answer'].length; k++) {
                    tmp = ''
                    for (n = 0; n < itemJson[index]['answer'][k].length; n++)
                        tmp += itemJson[index]['answer'][k][n]
                    console.log(tmp)
                }
                console.log('')

                if (itemJson[index]['highlight'].length == 4) {
                    for (k = 0; k < itemJson[index]['highlight'].length; k++) {
                        n = itemJson[index]['highlight'][k][0]
                        m = itemJson[index]['highlight'][k][1]
                        textJson[n] = textJson[n].substring(0, m) + '\n' + textJson[n].substring(m + 1)
                    }
                    begin = itemJson[index]['highlight'][0][0]
                    end = itemJson[index]['highlight'][3][0]
                    tmp = textJson[begin]
                    if (begin != end)
                        tmp += textJson[end]
                    console.log(tmp)
                }
                else {
                    for (k = 0; k < itemJson[index]['highlight'].length; k++) {
                        if (itemJson[index]['highlight'][k].length == 1)
                            console.log(itemJson[index]['highlight'][k][0] + 1)
                        else {
                            n = itemJson[index]['highlight'][k][0]
                            begin = itemJson[index]['highlight'][k][1]
                            end = itemJson[index]['highlight'][k][2]
                            console.log(textJson[n].substring(begin, end))
                        }
                    }
                }

                console.log('====================================')
            }
        })
    })
})
