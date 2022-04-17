<script>
import axios from "axios"
import getFileData from "./getFileData"
import EventBus from "../../common/EventBus"

export default {
    mixins: [getFileData],
    methods: {
        // 方法：上传当前笔记
        // 注：文件夹内文件上传前必须选择对应文件夹
        upload() {
            const noteName = this.note.NM
            let loc, folderName

            // 若选择项目
            if (this.selected) {
                loc = this.selected.loc.split(",")

                const item = this.noteList[loc[0]]
                // 若已选择文件夹，获取文件夹名
                if (typeof item == "object") {
                    const folder = this.noteList[loc[0]]
                    folderName = folder[0]
                }
            }

            // 上传
            axios.post("/api/upload", {
                note: JSON.stringify(this.note),
                location: loc, noteName, folderName,
                password: this.password
            }).then((res) => {

                // 若返回码为 0
                if (!res.data.code) {
                    // 若为新笔记
                    if (res.data.isNew) {
                        // 更新笔记列表
                        this.noteList = res.data.noteList
                    }

                    EventBus.emit("show-msg", "笔记上传请求成功。")
                } else { // 若返回码不为 0
                    EventBus.emit("show-msg", res.data.msg)
                }
            }).catch((err) => {
                console.warn(err)
                EventBus.emit("show-msg", "笔记上传请求失败。")
            })
        },
        // 方法：下载服务器中笔记
        download() {
            // 若未选择文件
            if (!this.selected) {
                alert("请选择文件！")
                return
            }
            
            const loc = this.selected.loc.split(",")
            const fileInfo = this.getFileData(loc)
            const item = this.noteList[loc[0]]
            // 若选择文件夹
            if (loc.length == 1 && typeof item == "object") {
                alert("不能下载文件夹。")
                return
            }

            axios.post("/api/download", {
                location: loc, fileInfo,
                password: this.password
            }).then((res) => {
                // 若返回码为 0
                if (!res.data.code) {
                    EventBus.emit("show-msg", "笔记下载成功。")
                    // 询问是否继续
                    let toChange = confirm("将覆盖当前笔记，是否继续？")
                    if (toChange) {
                        const resJsonStr = res.data.noteContent
                        const resNote = JSON.parse(resJsonStr)
                        this.note.NM = resNote.NM
                        this.note.CTS = resNote.CTS

                        // 选中对应文件夹
                        const folderLoc = loc[0]
                        this.$refs.uploaderList.selFolder(folderLoc)
                    }
                } else if (res.data.code == 5) {
                        this.noteList = res.data.noteList
                        EventBus.emit("show-msg", res.data.msg)
                } else { // 若返回码不为 0
                    EventBus.emit("show-msg", res.data.msg)
                }
            }).catch((err) => {
                console.warn(err)
                EventBus.emit("下载文件请求错误！")
            })
        },
        // 方法：创建文件夹
        creatFolder(obj) {
            this.addingFolder = false
            // 若输入为空
            if (!obj) {
                return
                // 若笔记列表中已存在
            }
            const folderName = obj.CT

            axios.post("/api/create", {
                folderName,
                password: this.password
            }).then((res) => {
                // 若返回码为 0
                if (!res.data.code) {
                    EventBus.emit("show-msg", "文件夹创建成功。")
                    console.log(res.data.status)
                    // 更新笔记列表
                    this.noteList = res.data.noteList
                } else { // 若返回码不为 0
                    EventBus.emit("show-msg", res.data.msg)
                }
            }).catch((err) => {
                console.warn(err)
                EventBus.emit("创建文件夹请求错误。")
            })
        },
        // 方法：删除文件或文件夹
        deleteFile() {
            const toContinue = confirm("此操作无法撤销，你确定吗？")
            if (toContinue) {
                const loc = this.selected.loc.split(",")
                const fileInfo = this.getFileData(loc)

                axios.post("/api/delete", {
                    location: loc, fileInfo,
                    password: this.password
                }).then((res) => {
                    // 若返回码为 0
                    if (!res.data.code) {
                        this.noteList = res.data.noteList
                        EventBus.emit("show-msg", "文件删除成功。")
                    } else if (res.data.code == 5) {
                        this.noteList = res.data.noteList
                        EventBus.emit("show-msg", res.data.msg)
                    } else {
                        EventBus.emit("show-msg", res.data.msg)
                    }
                }).catch((err) => {
                    console.warn(err)
                    EventBus.emit("删除文件请求错误。")
                })
            }
        }
    },
    mounted() {
        EventBus.on("open-uploader", () => {
            this.disabled = false

            // 若笔记列表为空
            if (!this.noteList.length) {
                const timestamp = new Date().getTime()
                // 获取笔记列表
                axios.get(`/api/note-list?timestamp=${timestamp}`)
                .then((res) => {
                    this.noteList = res.data.noteList
                })
            }
        })
    }
}
</script>