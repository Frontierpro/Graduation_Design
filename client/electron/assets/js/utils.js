module.exports = {
    format: (tmpList) => {
        let resList = []
        let index = 0
        for (let tmp of tmpList) {
            let res = {'id': ++index, 'title': tmp.title, 'status': tmp.status}
            resList.push(res)
        }
        return resList
    }
}
