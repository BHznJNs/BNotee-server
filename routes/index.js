const { readFileSync } = require("fs")
const express = require("express")
const router = express.Router()

// 读取主页 html
let indexFile
try {
    indexFile = readFileSync("BNotee-vue/dist/index.html", "utf-8")
} catch {
    throw "index.html 读取错误！"
}

router.get("/", (req, res) => {
    const NoteList = JSON.stringify(globalThis.NoteList)
    const html = indexFile.replace(`{__NOTELIST__}`, NoteList)
    res.send(html)
})

module.exports = router
