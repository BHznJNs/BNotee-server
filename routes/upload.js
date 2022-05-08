const NoteDB = require("../script/db")
const checkPassword = require("../script/checkPassword")

const express = require("express")
const router = express.Router()

// api：上传笔记数据
router.post("/api/upload", (req, res) => {
    const password = req.body.password
    const isPasswordRight = checkPassword(password)
    // 若密码错误
    if (!isPasswordRight) {
        res.send(globalThis.Status[1])
        return
    }

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
        const folder = globalThis.NoteList[folderLoc][1]

        name = `${folderName}/${noteName}`

        // 若为新文件
        if (!folder.includes(noteName)) {
            folder.push(noteName) // 写入数据
            isNew = true
        }
    }

    NoteDB.write(isNew, name, noteContent, (err) => {
        // 操作成功
        if (!err) {
            let status = Object.create({}, globalThis.Status[0])
            status.isNew = isNew
            status.noteList = globalThis.NoteList
            res.send(status)
        } else {
            console.warn(err)
            res.send(globalThis.Status[3])
        }
    })
})

module.exports = router