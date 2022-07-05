/**
 * @description 当笔记为新时，加入 noteList
 */
function pushNewNote(req, res, next) {
    const isNew = res.locals.isNew
    if (isNew) {
        const noteName = req.body.noteName
        const folder = res.locals.folder
        folder.push(noteName)
    }
    next()
}
module.exports = pushNewNote