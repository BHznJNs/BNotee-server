const NoteDB = require("../../script/db")
const express = require("express")
const router = express.Router()

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


    NoteDB.read(name, (content, err) => {
        if (!err) {
            let statue = globalThis.Status[0]
            statue.noteContent = content
            res.send(statue)
        } else {
            console.warn(err)
            res.send(globalThis.Status[2])
        }
    })
})

module.exports = router
