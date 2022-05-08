<template>
    <div
        class="uploader-outer fullscreen-mask"
        :class="{ disabled }"
    >
        <div class="uploader shadow-16">
            <!-- Closer -->
            <div
                class="closer shadow-1"
                @click="disabled = true"
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
                    placeholder="笔记名" maxlength="20"
                    v-model="note.NM"
                >
                <input
                    class="inputter" type="password"
                    placeholder="密码" maxlength="10"
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
import TextfieldGroup from "../textfieldGroup"
import request from "../mixin/request"

export default {
    components: { UploaderList, TextfieldGroup },
    mixins: [request],
    inject: ["note"],
    data() {
        return {
            disabled: true,
            selected: null,
            addingFolder: false,
            password: "",
            noteList: []
        }
    },
    methods: {
        select(sld) {
            this.selected = sld
        },
        // 方法：打开文件夹输入框
        toCreatFolder() {
            this.addingFolder = true
            this.$refs.textfieldGroup.focus()
        }
    },
    
}
</script>

<style scoped>
    .fullscreen-mask {
        display: grid;
        place-items: center;
        z-index: 1000;
        cursor: default;
    }
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
            width: 148px;
            max-width: 85%;
        }
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

    /* Closer */
    .closer {
        width: 4rem;
        border-radius: 0 0 8px 0;
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