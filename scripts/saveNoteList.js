const { writeFileSync } = require("fs")

// 保存笔记列表数据
function saveNoteList() {
    try {
        const noteList = JSON.stringify(globalThis.NoteList)
        writeFileSync("data/notes.json", noteList)
    } catch {
        console.log("笔记列表保存失败！")
    }
}

module.exports = saveNoteList