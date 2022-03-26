const saveNoteList = require("../../script/saveNoteList")
const express = require("express")
const router = express.Router()

// 函数：文件夹名校验
function checkFolder(name) {
    for (let item of globalThis.NoteList) {
        // 若 item 类型为 项目
        if (typeof item == "string") {
            continue
        }
        // 若 item 类型为 项目组
        if (item[0] == name) {
            // 若笔记列表中存在 文件夹
            return true
        }
    }
    // 若笔记列表中不存在 文件夹
    return false
}

// api：创建文件夹
router.post("/api/create", (req, res) => {
    const password = req.body.password
    const folderName = req.body.folderName
    const isFolderExist = checkFolder(folderName)

    // 若文件夹已存在
    if (isFolderExist) {
        res.send(globalThis.Status[4])
    // 若文件夹不存在
    } else {
        // 数据写入
        globalThis.NoteList.push([
            folderName,
            []
        ])
        saveNoteList()

        let status = globalThis.Status[0]
        status.noteList = globalThis.NoteList
        res.send(status)
    }
})

module.exports = router
