require("./script/readConf")
require("./script/initialFileCreate")
require("./script/noteList")
require("./script/status")

const bodyParser = require("body-parser")
const express = require("express")
const app = express()

// 静态文件目录 Static File Path
app.use("/static", express.static("./BNotee-vue/dist"))
// Post 数据解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 路由引入 Router Import
const IndexRouter = require("./routes/index")
const UploadRouter = require("./routes/api/upload")
const DownloadRouter = require("./routes/api/download")
const CreateRouter = require("./routes/api/create")
const DeleteRouter = require("./routes/api/delete")
// 路由 Use Routers
app.use(IndexRouter)
app.use(UploadRouter)
app.use(DownloadRouter)
app.use(CreateRouter)
app.use(DeleteRouter)

app.listen(3000, () => {
    console.log("应用正在监听 3000 端口。")
})
