const saveNoteList = require("../../script/saveNoteList")
const sqlite3 = require("sqlite3")
const express = require("express")
const router = express.Router()

const DBFilePath = "./data/notes.db"
function DBWrite(type, name) {}

// api：上传笔记数据
router.post("/api/delete", (req, res) => {
    const password = req.body.password
    const location = req.body.location // [1, 2]

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
})

module.exports = router
