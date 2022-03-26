const sqlite3 = require("sqlite3")
const express = require("express")
const router = express.Router()

const DBFilePath = "data/notes.db"
// 函数：读取数据库
function DBRead(noteName, callback) {
    let db = new sqlite3.Database(DBFilePath)
    db.serialize(() => {
        db.get(`
            select json from notes
            where name == '${noteName}';
        `, (err, res) => {
            if (err) {
                callback(null, err)
            } else {
                callback(res.json, null)
            }
        })
    })
    db.close()
}

// api：获取笔记数据
router.post("/api/download", (req, res) => {
    const location = req.body.location

    let name

    if (location.length > 1) { // 若在文件夹中
        const folderLoc = location[0]
        const noteLoc = location[1]

        const folder = globalThis.NoteList[folderLoc]
        const folderName = folder[0]
        const noteName = folder[1][noteLoc]
        name = `${folderName}/${noteName}`
    } else { // 若不在文件夹中
        const noteLoc = location[0]
        name = globalThis.NoteList[noteLoc]
    }


    DBRead(name, (content, err) => {
        if (!err) {
            let statue = globalThis.Status[0]
            statue.noteContent = content
            res.send(statue)
        } else {
            console.log(err)
            res.send(globalThis.Status[2])
        }
    })
})

module.exports = router
