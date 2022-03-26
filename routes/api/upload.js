const saveNoteList = require("../../script/saveNoteList")
const sqlite3 = require("sqlite3")
const express = require("express")
const router = express.Router()

const DBFilePath = "./data/notes.db"
// 函数：写入数据库
function DBWrite(isNew, noteName, noteContent, callback) {
    const db = new sqlite3.Database(DBFilePath)

    db.serialize(() => {
        if (isNew) {  // 若为新笔记
            db.run(`
                insert into notes (name, json)
                values ('${noteName}', '${noteContent}');
            `)
        } else { // 若笔记列表中已存在
            db.run(`
                update notes set json = '${noteContent}'
                where name = '${noteName}';
            `)
        }
    })
    db.close((err) => {
        callback(err)
    })
}

// api：上传笔记数据
router.post("/api/upload", (req, res) => {
    const password = req.body.password
    const noteContent = req.body.note
    const location = req.body.location

    const noteName = req.body.noteName
    const folderName = req.body.folderName

    let isNew = false
    let name
    // 若不在文件夹中
    if (!folderName) {
        name = noteName
        // 若为新文件
        if (!globalThis.NoteList.includes(noteName)) {
            globalThis.NoteList.push(noteName) // 写入数据
            isNew = true
        }
    } else { // 若在文件夹中
        const folderLoc = location[0]
        const folder = globalThis.NoteList[folderLoc]

        name = `${folderName}/${noteName}`

        // 若为新文件
        if (!folder.includes(noteName)) {
            folder.push(noteName) // 写入数据
            isNew = true
        }
    }

    DBWrite(isNew, name, noteContent, (err) => {
        if (!err) {
            let status = globalThis.Status[0]
            status.isNew = isNew
            status.noteList = globalThis.NoteList
            res.send(status)
        } else {
            res.send(globalThis.Status[3])
        }
    })
    saveNoteList()
})

module.exports = router
