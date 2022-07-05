const saveNoteList = require("../saveNoteList")
const sqlite3 = require("sqlite3")

const DBFilePath = "data/notes.db"
const db = new sqlite3.Database(DBFilePath)
db.serialize(() => {
    db.run(`
        create table if not exists notes
        (
            name    text    not null,
            json    text
        );
    `)
})

class NoteDB {
    static write(isNew, noteName, noteContent, callback) {
        db.serialize(() => {
            if (isNew) {  // 若为新笔记
                db.run(`
                    insert into notes (name, json)
                    values ( ? , ? );
                `, noteName, noteContent, callback)
            } else { // 若笔记列表中已存在
                db.run(`
                    update notes set json = ?
                    where name = ? ;
                `, noteContent, noteName, callback)
            }
        })
    }
    static read(noteName, callback) {
        db.serialize(() => {
            db.get(`
                select json from notes
                where name == ? ;
            `, noteName, callback)
        })
    }
    static delete(type, name, callback) {
        // console.log(name)
        db.serialize(() => {
            // 若类型为 文件夹，则删除文件下所有文件
            if (type == "folder") {
                db.run(`
                    delete from notes
                    where name like '?/%';
                `, name, callback)
            } else {
                db.run(`
                    delete from notes
                    where name = ? ;
                `,name, callback)
            }
        })
    }
}

// 程序关闭时运行
process.on("SIGTERM", shutDown)
process.on("SIGINT", shutDown)
function shutDown() {
    db.close()
    saveNoteList()
    console.log("shutdown")
    process.exit(0)
}

globalThis.DB = NoteDB