// 判断 文件/文件夹 类型 并 获取 文件/文件夹 名称
function getData(loc) {
    const item = globalThis.NoteList[loc[0]]

    let type, name
    // 文件夹内文件
    if (loc.length == 2) {
        type = "file"
        const folder = item[1]
        const folderName = item[0]
        const fileName = folder[loc[1]]
        name = `${folderName}/${fileName}`
    } else { // 不在文件夹内
        if (typeof item == "string") {
            // 文件
            type = "file"
            name = item
        } else if (typeof item == "object") {
            // 文件夹
            type = "folder"
            name = item[0]
        }
    }
    return { type, name }
}
// 校验客户端数据与服务器数据是否相同
function checker(loc, clientFileInfo) {
    const serverFileInfo = getData(loc) // 服务器数据

    const isEqual = ( // 是否相同
        clientFileInfo.type == serverFileInfo.type &&
        clientFileInfo.name == serverFileInfo.name
    )

    return isEqual
}

module.exports = checker