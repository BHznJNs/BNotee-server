require("./script/readConf")
require("./script/initFileCreate")
require("./script/noteList")
require("./script/status")

const bodyParser = require("body-parser")
const express = require("express")
const app = express()

// 静态文件目录 Static File Path
app.use("/", express.static("./BNotee-vue/dist"))
// Post 数据解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 路由引入 Router Import
const NoteListRouter = require("./routes/noteList")
const UploadRouter = require("./routes/upload")
const DownloadRouter = require("./routes/download")
const CreateRouter = require("./routes/create")
const DeleteRouter = require("./routes/delete")
// 路由 Use Routers
app.use(NoteListRouter)
app.use(UploadRouter)
app.use(DownloadRouter)
app.use(CreateRouter)
app.use(DeleteRouter)

app.listen(3030, () => {
    console.log("http://localhost:3030/")
    console.log("应用正在监听 3030 端口。")
})