const { accessSync, constants, writeFileSync, mkdirSync } = require("fs")
const sqlite3 = require("sqlite3")

// 创建初始文件
const DataDirPath = "./data"
try {
    accessSync(DataDirPath, constants.R_OK | constants.W_OK)
    console.log("Folder 'data' Exist.")
} catch {
    mkdirSync(DataDirPath)
}
const NoteDataPath = "./data/notes.json"
try {
    accessSync(NoteDataPath, constants.R_OK | constants.W_OK)
    console.log("File 'notes.json' Exist.")
} catch {
    writeFileSync(NoteDataPath, "[]")
}
