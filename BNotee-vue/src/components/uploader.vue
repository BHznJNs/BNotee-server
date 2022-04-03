<template>
    <div
        class="uploader-outer"
        :class="{ disabled }"
    >
        <div class="uploader shadow-16">
            <!-- Closer -->
            <div
                class="closer shadow-1"
                @click="() => {disabled = true}"
            >
                <i class="material-icons">close</i>
            </div>


            <!-- Note View -->
            <div class="note-view-outer">
                <div class="note-view">
                    <uploader-list
                        @file-select="select"
                        :list="noteList"
                        ref="uploaderList"
                    >
                        <textfield-group
                            @return-node="creatFolder"
                            :isAdding="addingFolder"
                            ref="textfieldGroup"
                        />
                    </uploader-list>
                </div>
            </div>

            <!-- Input Group -->
            <div class="input-group">
                <input
                    class="inputter" type="text"
                    placeholder="笔记名"
                    v-model="note.NM"
                >
                <input
                    class="inputter" type="password"
                    placeholder="密码"
                    v-model="password"
                >
            </div>
            <!-- Buttons -->
            <div class="buttons shadow-3">
                <!-- 上传 -->
                <div
                    class="btn btn-shallow"
                    @click="upload"
                >
                    <i class="material-icons">cloud_upload</i>
                </div>
                <!-- 下载 -->
                <div
                    class="btn btn-shallow"
                    @click="download"
                >
                    <i class="material-icons">file_download</i>
                </div>
                <!-- 创建文件夹 -->
                <div
                    class="btn btn-shallow"
                    @click="toCreatFolder"
                >
                    <i class="material-icons">create_new_folder</i>
                </div>
                <!-- 删除 -->
                <div
                    class="btn btn-shallow"
                    @click="deleteFile"
                >
                    <i class="material-icons">delete_forever</i>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
import UploaderList from "./uploaderList"
import TextfieldGroup from './textfieldGroup'
import EventBus from "../common/EventBus"
import axios from "axios"

export default {
    components: { UploaderList, TextfieldGroup },
    inject: ["note"],
    data() {
        return {
            disabled: true,
            selected: null,
            addingFolder: false,
            password: "",
            noteList: [
                    "项目",
                    ["项目组", ["项目","项目"]],
                    "项目"
                ]//window.NoteList
            /* 
                [
                    "项目",
                    ["项目组", ["项目","项目"]],
                    "项目"
                ]
            */
        }
    },
    methods: {
        select(sld) {
            this.selected = sld
        },
        // 方法：上传当前笔记
        // 注：文件夹内文件上传前必须选择对应文件夹
        upload() {
            const noteName = this.note.NM
            let location, folderName

            if (this.selected) {
                location = this.selected.loc.split(",")
                // 若已选择文件夹，获取文件夹名
                const item = this.noteList[location[0]]
                if (typeof item == "object") {
                    const folder = this.noteList[location[0]]
                    folderName = folder[0]
                }
            }

            // console.log(noteName, folderName)

            // 上传
            axios.post("api/upload", {
                note: JSON.stringify(this.note),
                location, noteName, folderName,
                password: this.password
            }).then((res) => {
                console.log(res)

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
            // 若选择文件夹
            const location = this.selected.loc.split(",")

            const item = this.noteList[location[0]]
            if (typeof item == "object") {
                alert("不能下载文件夹。")
                return
            }

            axios.post("api/download", {
                location,
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
                        this.note = resNote

                        // 选中对应文件夹
                        const folderLoc = location[0]
                        this.$refs.UploaderList.selFolder(folderLoc)
                    }
                } else { // 若返回码不为 0
                    EventBus.emit("show-msg", res.data.msg)
                }
            }).catch((err) => {
                console.warn(err)
                EventBus.emit("下载文件请求错误！")
            })
        },
        // 方法：打开文件夹输入框
        toCreatFolder() {
            this.addingFolder = true
            this.$refs.textfieldGroup.focus()
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

            axios.post("api/create", {
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
                const location = this.selected.loc.split(",")

                axios.post("api/delete", {
                    location,
                    password: this.password
                }).then((res) => {
                    // 若返回码为 0
                    if (!res.data.code) {
                        this.noteList = res.data.noteList
                        EventBus.emit("show-msg", "文件删除成功。")
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
        })
    }
}
</script>
<style scoped>
    /* 横屏 */
    @media screen and (orientation: landscape) {
        .uploader {
            grid-template-rows: 36px auto 44px;
            grid-template-columns: auto 64px;
        }
        .buttons {
            display: flex;
            flex-direction: column;
            grid-row: 1 / 4;
            justify-content: space-around;
        }
    }
    /* 竖屏 */
    @media screen and (orientation: portrait) {
        .uploader {
            grid-template-rows: 36px auto 44px 128px;
        }
        .buttons {
            display: grid;
            grid-template-rows: 1fr 1fr;
            grid-template-columns: 1fr 1fr;
            justify-items: center;
            align-items: center;
        }
        .btn {
            min-width: 85%
        }
    }

    .uploader-outer {
        position: absolute;
        top: 0;
        left: 0;
        display: grid;
        place-items: center;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.4);
        z-index: 1000;
        transition: opacity .6s;
    }
    .uploader-outer.disabled {
        opacity: 0;
        pointer-events: none;
    }
    
    .uploader {
        display: grid;
        grid-auto-flow: column;

        width: 800px;
        max-width: 85vw;
        height: 400px;
        max-height: 85vh;
        z-index: 1001;
        background-color: #fff;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        -webkit-border-radius: 8px;
                border-radius: 8px;
        overflow: hidden;
    }

    /* Note View */
    .note-view-outer {
        position: relative;
        margin: 6px 0 0;
        border-top: 1px solid #C3C3C3;
        border-bottom: 1px solid #C3C3C3;
        overflow: auto;
    }
    /* Note View End */

    /* Function Buttons */
    .function-btns {
        display: flex;
        justify-content: space-between;
        padding-bottom: 4px;
        overflow: hidden;
    }
    .closer {
        width: 4rem;
        border-radius: 0 0 8px 0;
    }
    .closer i {
        line-height: 36px;
    }
    /* Closer End */

    /* Buttons */
    .buttons {
        padding: 0 8px;
    }
    /* Buttons End */

    /* Inputter */
    .input-group {
        display: grid;
        grid-template-columns: 1.2fr .8fr;
        max-width: 95%;
    }
    @media screen and (max-width: 800px) {
        .input-group {
            min-width: 85%;
        }
    }
    .inputter {
        width: auto !important;
    }
    .inputter:first-child {
        border-right: 1px solid #888;
    }
    /* Inputter End */
</style>