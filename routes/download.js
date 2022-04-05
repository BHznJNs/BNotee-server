const NoteDB = require("../script/db")
const checkFile = require("../script/checkData")
const express = require("express")
const router = express.Router()

// api：获取笔记数据
router.post("/api/download", (req, res) => {
    const password = req.body.password
    const location = req.body.location
    const fileInfo = req.body.fileInfo

    // 数据校验
    const isDataEqual = checkFile(location, fileInfo)
    if (!isDataEqual) {
        // 若数据不同，发送错误信息
        let status = globalThis.Status[5]
        // 并发送服务器端数据
        status.noteList = globalThis.NoteList
        res.send(status)
        return
    }

    // let name

    // if (location.length > 1) { // 若在文件夹中
    //     const folderLoc = location[0]
    //     const noteLoc = location[1]

    //     const folder = globalThis.NoteList[folderLoc]
    //     const folderName = folder[0]
    //     const noteName = folder[1][noteLoc]
    //     name = `${folderName}/${noteName}`
    // } else { // 若不在文件夹中
    //     const noteLoc = location[0]
    //     name = globalThis.NoteList[noteLoc]
    // }


    NoteDB.read(fileInfo.name, (err, content) => {
        if (!err) {
            let status = globalThis.Status[0]
            status.noteContent = content.json
            res.send(status)
        } else {
            console.warn(err)
            res.send(globalThis.Status[2])
        }
    })
})

module.exports = router
