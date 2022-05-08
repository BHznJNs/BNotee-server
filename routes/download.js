const NoteDB = require("../script/db")
const checkNoteName = require("../script/checkNoteName")
const checkPassword = require("../script/checkPassword")

const express = require("express")
const router = express.Router()

// api：获取笔记数据
router.post("/api/download", (req, res) => {
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

    NoteDB.read(fileInfo.name, (err, content) => {
        if (!err) {
            let status = Object.create({}, globalThis.Status[0])
            status.noteContent = content.json
            res.send(status)
        } else {
            console.warn(err)
            res.send(globalThis.Status[2])
        }
    })
})

module.exports = router
