<!-- 仅允许双层嵌套 -->
<template>
    <div v-if="!list.length">
        <div class="no-note">暂无笔记</div>
    </div>

    <ul class="note-list" ref="noteList">
        <template
            v-for="(item, index) in list"
            :key="item.id"
        >
            <!-- 文件夹 -->
            <div v-if="typeof item == 'object'">
                <!-- 文件夹名 -->
                <div
                    class="folder-name" 
                    @click="showToggle"
                    :data-location="index"
                >
                    <i class="item-avatar material-icons"
                        @click.stop="select"
                    >folder_open</i>
                    <span class="item-content">{{ item[0] }}</span>
                </div>
                <ul class="folder">
                    <!-- 文件夹项 -->
                    <li class="folder-item" :key="item_.id"
                        v-for="(item_, index_) in item[1]"
                        @click="select"
                        :data-location="[index, index_]"
                    >
                        <i class="item-avatar material-icons">assignment</i>
                        <span class="item-content">{{ item_ }}</span>
                    </li>
                </ul>
            </div>

            <!-- 列表项 -->
            <li v-else :data-location="index"
                class="list-item" @click="select"
            >
                <i class="item-avatar material-icons">assignment</i>
                <span class="item-content">{{ item }}</span>
            </li>
        </template>

        <slot/>
    </ul>
</template>
<script>
export default {
    props: ["list"],
    emits: ["file-select"],
    data() {
        return {
            selected: {
                loc: "",
                type: "" // file or folder
            },
            // 上一个被选取的节点
            lastSelectedNode: null
        }
    },
    methods: {
        // 方法：切换文件夹显示 / 隐藏
        showToggle(e) {
            const el = e.target
            const folderEl = el.nextSibling
            if (folderEl.style.maxHeight) {
                folderEl.style.maxHeight = null
            } else {
                folderEl.style.maxHeight = folderEl.scrollHeight + "px"
            }
        },
        // 方法：选取文件
        select(e) {
            let obj = e.target
            // 若选取文件夹
            if (obj.tagName == "I") {
                obj = obj.parentNode
                this.selected.type = "folder"
            } else {
                this.selected.type = "file"
            }
            const objLoc = obj.dataset["location"]
            // 若目的节点已被选择 -> 取消选择
            if (this.selected.loc == objLoc) {
                obj.classList.remove("selected")
                this.selected.loc = ""
                this.selected.type = ""
                this.lastSelectedNode = null

                this.$emit("file-select", null)
            } else { // 若未被选择
                obj.classList.add("selected")
                // 若存在已被选择节点
                if (this.lastSelectedNode) {
                    // 已被选择节点去除样式
                    this.lastSelectedNode.classList.remove("selected")
                }
                this.lastSelectedNode = obj
                this.selected.loc = objLoc

                this.$emit("file-select", this.selected)
            }
        },
        // 方法：选取指定文件夹
        selFolder(location) {
            const noteList = this.$refs.noteList
            const folderNode = noteList.children[location]
            const folderIconNode = folderNode.querySelector("i")
            folderIconNode.click()
        }
    }
}
</script>
<style scoped>
    /* No Note */
    .no-note {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 24px;
        color: #666;
    }
    /* No Note End */

    /* Note List */
    .note-list, .folder {
        margin-bottom: 4px;
        padding: 0 0 8px;
        list-style: none;
        background-color: transparent;
        overflow: hidden;
    }
 
    /* Folder */
    .folder {
        max-height: 0;
        padding: 0 0 0 36px;
        -webkit-transition: max-height .3s;
                transition: max-height .3s;
    }
    .folder .folder-name {
        margin-left: -36px;
    }
    .folder-name .item-avatar {
        pointer-events: auto !important;
    }
    .folder-item .item-avatar {
        width: 28px;
        height: 28px;
        line-height: 28px;
        font-size: 20px;
    }
    .folder-item .item-content {
        font-size: 14px;
    }
    /* Folder End */

    /* 列表项 */
    .list-item, .folder-name, .folder-item{
        display: flex;
        align-items: center;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        min-height: 36px;
        padding: 0 16px;
        text-decoration: none;
        cursor: pointer;
        user-select: none;
        -webkit-transition: background-color 0.3s;
                transition: background-color 0.3s;
    }
    .list-item:hover, .folder-name:hover, .folder-item:hover {
        background-color: #eeeeee;
    }
    .item-avatar {
        width: 36px;
        height: 36px;
        margin: 4px 8px 4px 0;
        color: #FFFFFF;
        line-height: 36px;
        text-align: center;
        background-color: #BDBDBD;
        border-radius: 50%;
        pointer-events: none;
    }
    .item-content {
        padding: 4px 0;
        border-bottom: 1px solid #E0E0E0;
        pointer-events: none;
    }

    .selected {
        background-color: #dddddd !important;
        border: none;
        -webkit-box-shadow: none;
                box-shadow: none;
    }
</style>