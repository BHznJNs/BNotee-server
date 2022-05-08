const NoteDB = require("../script/db")
const checkNoteName = require("../script/checkNoteName")
const checkPassword = require("../script/checkPassword")

const express = require("express")
const router = express.Router()

// 函数：笔记列表编辑
function noteListEdit(location) {
    if (location.length == 1) {
        const loc = location[0]
        globalThis.NoteList.splice(loc, 1)
    } else {
        const loc1 = location[0]
        const loc2 = location[1]
        globalThis.NoteList[loc1][1].splice(loc2, 1)
    }
}

// api：删除笔记数据
router.post("/api/delete", (req, res) => {
    const password = req.body.password
    const location = req.body.location
    const fileInfo = req.body.fileInfo
    // 数据校验
    const isDataEqual = checkNoteName(location, fileInfo)
    if (!isDataEqual) {
        // 若数据不同，发送错误信息
        let status = Object.create({}, globalThis.Status[5])
        // 并发送服务器端数据
        status.noteList = globalThis.NoteList
        res.send(status)
        return
    }

    let fileType = fileInfo.type
    let fileName = fileInfo.name

    NoteDB.delete(fileType, fileName, (err) => {
        // 操作成功
        if (!err) {
            noteListEdit(location)

            let status = Object.create({}, globalThis.Status[0])
            status.noteList = globalThis.NoteList
            res.send(status)
        } else {
            console.warn(err)
            res.send(globalThis.Status[3])
        }
    })
})

module.exports = router