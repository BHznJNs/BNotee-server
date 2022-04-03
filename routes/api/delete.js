const saveNoteList = require("../../script/saveNoteList")
const NoteDB = require("../../script/db")
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

// api：上传笔记数据
router.post("/api/delete", (req, res) => {
    const password = req.body.password
    const location = req.body.location

    // 判断 文件/文件夹 类型 并 获取 文件/文件夹 名称
    let fileType, fileName
    const file = globalThis.NoteList[location[0]]
    if (location.length == 2 || typeof file == "string") {
        fileType = "file"
        if (location.length == 2) {
            fileName = file[1][location[1]]
        } else {
            fileName = file
        }
    } else {
        fileType = "folder"
        fileName = file[0]
    }

    NoteDB.delete(fileType, fileName, (err) => {
        // 操作成功
        if (!err) {
            noteListEdit(location)
            saveNoteList()

            let status = globalThis.Status[0]
            status.noteList = globalThis.NoteList
            res.send(status)
        } else {
            console.warn(err)
            res.send(globalThis.Status[3])
        }
    })
})

module.exports = router