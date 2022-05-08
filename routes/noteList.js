const express = require("express")
const router = express.Router()

router.get("/api/note-list", (req, res) => {
    let status = Object.create({}, globalThis.Status[0])
    status.noteList = globalThis.NoteList
    res.send(status)
})
module.exports = router