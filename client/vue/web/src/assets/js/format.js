module.exports = {
    txtFormat: (tmpList, begin, end) => {
        var resList = []
        for (let index in tmpList) {
            if (index >= begin && index <= end)
                resList.push(`<strong>${tmpList[index]}</strong>`)
            else
                resList.push(tmpList[index])
        }
        return resList
    },
    strReplace: (str, n, base) => {
        let index = 0
        while (true) {
            let pos = str.indexOf('\n')
            if (pos < 0)
                break
            let style = " color: coral;"
            let html = `<span style="cursor: pointer;${base + index === n ? style : ''}" `
            html += `onclick="select(${base + index++})"> [■] </span>`
            str = str.slice(0, pos) + html + str.slice(pos + 1)
        }
        return {'str': str, 'num': index}
    }
}
