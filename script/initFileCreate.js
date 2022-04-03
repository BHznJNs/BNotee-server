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
// 创建数据库文件
// const DBFilePath = "./data/notes.db"
// try {
//     accessSync(DBFilePath, constants.R_OK | constants.W_OK)
//     console.log("File 'notes.db' Exist.")
// } catch {
//     writeFileSync(DBFilePath, "")
//     let db = new sqlite3.Database(DBFilePath)
//     db.serialize(() => {
//         db.run(`
//             create table notes (
//                 name    text    not null,
//                 json    text
//             );
//         `)
//     })
//     db.close()
// }
