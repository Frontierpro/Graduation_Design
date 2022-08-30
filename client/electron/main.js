const { app, BrowserWindow, ipcMain, Menu, Tray } = require('electron')
const fs = require('fs')
const crypto = require('crypto')

const { format } = require('./assets/js/utils')

var adminWin, mainWin
var userName = ''
var tray
var close = false
var indexList = []

initWindow = () => {
    adminWin = new BrowserWindow({
        width: 300,
        height: 400,
        frame: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    adminWin.loadFile('./src/admin/index.html')
}

createWindow = () => {
    mainWin = new BrowserWindow({
        width: 900,
        height: 600,
        minWidth: 900,
        minHeight: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    })

    tray = new Tray('./assets/img/logo.ico')
    tray.setToolTip('meta-tpo')

    let menu = Menu.buildFromTemplate([{
        label: '退出',
        click: () => {
            close = true
            mainWin.close()
        }
    }])

    tray.setContextMenu(menu)

    tray.on('click', () => {
        mainWin.isVisible() ? mainWin.hide() : mainWin.show()
    })

    mainWin.loadFile('./src/app/index.html')
    mainWin.on('close', (e) => {
        if (!close) {
            e.preventDefault()
            mainWin.hide()
        }
    })
}

app.whenReady().then(() => {
    initWindow()

    ipcMain.on('admin-quit', () => {
        adminWin.close()
    })

    ipcMain.on('admin-minimize', () => {
        adminWin.minimize()
    })

    ipcMain.on('signin', (event, arg) => {
        userName = crypto.createHash('md5').update(arg).digest('hex')
        fs.exists(`local/${userName}`, (exists) => {
            if (exists) {
                createWindow()
                adminWin.close()
            }
            else
                fs.mkdir(`local/${userName}`, () => {
                    fs.mkdir(`local/${userName}/items`, () => {})
                    fs.writeFile(`local/${userName}/index.json`,
                    JSON.stringify([], null, '\t'), 'utf-8', () => {
                        createWindow()
                        adminWin.close()
                    })
                })
        })
    })

    ipcMain.on('main-quit', () => {
        mainWin.hide()
    })

    ipcMain.on('main-minimize', () => {
        mainWin.minimize()
    })

    ipcMain.on('main-maximize', () => {
        mainWin.isMaximized() ? mainWin.unmaximize() : mainWin.maximize()
    })

    ipcMain.on('main-unmaximize', () => {
        mainWin.isMaximized() ? mainWin.unmaximize() : mainWin.hide()
    })

    ipcMain.on('get_index', (event, data) => {
        for (let each of data) {
            let dist = JSON.parse(fs.readFileSync(`local/${userName}/items/${each.code}.json`, 'utf-8'))
            dist.res.splice(0, 0, each)
            fs.writeFileSync(`local/${userName}/items/${each.code}.json`, JSON.stringify(dist, null, '\t'))
        }
        fs.readFile(`local/${userName}/index.json`, 'utf-8', (err, data) => {
            indexList = JSON.parse(data)
            event.sender.send('set_index', {'list': format(indexList), 'focus': 0, 'user': userName})
        })
    })

    ipcMain.on('get_item', (event, val) => {
        let code = indexList[parseInt(val) - 1].code
        fs.readFile(`local/${userName}/items/${code}.json`, 'utf-8', (err, data) => {
            event.sender.send('set_item', {
                'ins': JSON.parse(data).ins, 'res': JSON.parse(data).res, 'code': code
            })
        })
    })

    ipcMain.on('save_item', (event, data) => {
        fs.writeFile(`local/${userName}/items/${indexList[parseInt(data.index) - 1].code}.json`,
        JSON.stringify(data.item, null, '\t'), 'utf-8', () => {
            indexList[parseInt(data.index) - 1].title = data.title
            fs.writeFile(`local/${userName}/index.json`,
            JSON.stringify(indexList, null, '\t'), 'utf-8', () => {
                event.sender.send('set_event', data.next)
            })
        })
    })

    ipcMain.on('new_item', (event) => {
        let code = crypto.randomBytes(5).toString('hex').toUpperCase()
        let item = {
            'ins': {'reading': [], 'listening': [], 'speaking': [], 'writing': []},
            'res': []
        }
        fs.writeFile(`local/${userName}/items/${code}.json`,
        JSON.stringify(item, null, '\t'), 'utf-8', () => {
            let index = {'code': code, 'title': `ID_${code}`, 'status': 1}
            indexList.splice(0, 0, index)
            fs.writeFile(`local/${userName}/index.json`,
            JSON.stringify(indexList, null, '\t'), 'utf-8', () => {
                event.sender.send('set_index', {'list': format(indexList), 'focus': 1})
            })
        })
    })

    ipcMain.on('drop_item', (event, val) => {
        fs.unlink(`local/${userName}/items/${indexList[parseInt(val) - 1].code}.json`, () => {})
        indexList.splice(parseInt(val) - 1, 1)
        fs.writeFile(`local/${userName}/index.json`,
        JSON.stringify(indexList, null, '\t'), 'utf-8', () => {
            event.sender.send('set_index', {'list': format(indexList), 'focus': 0})
        })
    })

    ipcMain.on('update_status', (event, data) => {
        if (data.val === 2) {
            let index = {
                'code': indexList[parseInt(data.tar) - 1].code,
                'title': indexList[parseInt(data.tar) - 1].title,
                'status': data.val
            }
            indexList.splice(data.tar - 1, 1)
            indexList.splice(0, 0, index)
        }
        else
            indexList[parseInt(data.tar) - 1].status = data.val
        fs.writeFile(`local/${userName}/index.json`,
        JSON.stringify(indexList, null, '\t'), 'utf-8', () => {
            if (data.val === 2)
                event.sender.send('set_index', {'list': format(indexList), 'focus': 1})
            else
                event.sender.send('set_index', {'list': format(indexList), 'focus': data.tar})
        })
    })
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0)
        createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        app.quit()
})
