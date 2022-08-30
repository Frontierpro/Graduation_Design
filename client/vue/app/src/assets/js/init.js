module.exports = {
    readingInitial: () => {
        let tmpList = []
        let index = 0
        for (let i = 1; i < 70; i++) {
            if (i > 58 && i < 63)
                continue
            for (let j = 1; j < 4; j++) {
                let tmp = {'id': ++index, 'title': `TPO ${i} Passage ${j}`, 'status': 0}
                tmpList.push(tmp)
            }
        }
        return tmpList
    },
    listeningInitial: () => {
        let tmpList = []
        let index = 0
        for (let i = 1; i < 70; i++) {
            if (i > 58 && i < 63)
                continue
            let tmp = {'id': ++index, 'title': `TPO ${i} Conversation 1`, 'status': 0}
            tmpList.push(tmp)
            tmp = {'id': ++index, 'title': `TPO ${i} Lecture 1`, 'status': 0}
            tmpList.push(tmp)
            tmp = {'id': ++index, 'title': `TPO ${i} Lecture 2`, 'status': 0}
            tmpList.push(tmp)
            tmp = {'id': ++index, 'title': `TPO ${i} Conversation 2`, 'status': 0}
            tmpList.push(tmp)
            tmp = {'id': ++index, 'title': `TPO ${i} Lecture 3`, 'status': 0}
            tmpList.push(tmp)
            if (i < 55) {
                tmp = {'id': ++index, 'title': `TPO ${i} Lecture 4`, 'status': 0}
                tmpList.push(tmp)
            }
        }
        return tmpList
    },
    speakingInitial: () => {
        let tmpList = []
        let index = 0
        for (let i = 1; i < 70; i++) {
            if (i > 58 && i < 63)
                continue
            for (let j = 1; j < 5; j++) {
                let tmp = {'id': ++index, 'title': `TPO ${i} Task ${j}`, 'status': 0}
                tmpList.push(tmp)
            }
        }
        return tmpList
    },
    writingInitial: () => {
        let tmpList = []
        let index = 0
        for (let i = 1; i < 70; i++) {
            if (i > 58 && i < 63)
                continue
            let tmp = {'id': ++index, 'title': `TPO ${i} Integrated`, 'status': 0}
            tmpList.push(tmp)
            tmp = {'id': ++index, 'title': `TPO ${i} Independent`, 'status': 0}
            tmpList.push(tmp)
        }
        return tmpList
    }
}
