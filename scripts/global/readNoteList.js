const { readFileSync } = require("fs")

// 读取笔记列表
const noteList = readFileSync("./data/notes.json", "utf-8")
globalThis.NoteList = JSON.parse(noteList)
