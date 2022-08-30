module.exports = {
    encodeID: (route, title) => {
        if (route === 'reading' || route === 'speaking')
            return title.split(' ')[3]
        else if (route === 'listening')
            return title.split(' ')[2] === 'Lecture'?
                1 + Math.floor(title.split(' ')[3] / 3) + parseInt(title.split(' ')[3]):
                3 * title.split(' ')[3] - 2
        else
            return title.split(' ')[2] === 'Integrated' ? 1 : 2
    },
    upperHead: (tmp) => {
        return tmp.slice(0, 1).toUpperCase() + tmp.slice(1)
    },
    indexOF: (str, list) => {
        for (let index in list)
            if (str === list[index].title)
                return list[index].id
        return 0
    }
}
