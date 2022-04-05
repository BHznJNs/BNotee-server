<template>
    <transition name="slide">
    <div
        class="table-setter fixed-component"
        v-show="!disabled"
    >
        <div class="input-group">
            <i class="hint material-icons">view_headline</i>
            <input
                class="inputter" type="text"
                placeholder=" > 0 "
                v-model="row"
            >
        </div>
        
        <div class="input-group">
            <i class="hint material-icons">view_column</i>
            <input
                class="inputter" type="text"
                placeholder=" > 0 " maxlength="3"
                v-model="col"
            >
        </div>

        <div
            class="closer"
            @click="tableSet"
        >
            <i class="material-icons">check</i>
        </div>

        <div
            class="closer"
            @click="$emit('close', 'tableSetter')"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
    </transition>
</template>
<script>
import EventBus from '../common/EventBus'
import getNodeObj from "./mixin/getNodeObj"

export default {
    data() {
        return {
            row: 1,
            col: 1,
            targetNode: null,
            timeout: null
        }
    },
    props: ["disabled"],
    inject: ["selectedNode"],
    mixins: [getNodeObj],
    mounted() {
        addEventListener("keydown", (e) => {
            if (e.key == "Enter") {
                this.tableSet()
            }
        })
        EventBus.on("table-selected", this.tableGet)
    },
    methods: {
        tableGet() {
            // 获取目标表格节点
            this.getNodeObj({
                location: this.selectedNode.location,
                callback: (nodeArray, index) => {
                    this.targetNode = nodeArray[index]
                }
            })
            // 获取目标行数、列数
            this.row = this.targetNode.CTS.length
            this.col = this.targetNode.CTS[0].length
        },
        tableSet() {
            //    目标节点行数、列数
            const initialRow = this.targetNode.CTS.length
            const initialCol = this.targetNode.CTS[0].length
            // 计算差值
            const rowDiff = Math.abs(this.row - initialRow)
            const colDiff = Math.abs(this.col - initialCol)
            // 若列数增加
            if (this.col > initialCol) {
                for (let row of this.targetNode.CTS) {
                    
                    for (let i = 0; i < colDiff; i++) {
                        row.push("")
                    }
                }
            } else { // 若列数减少
                for (let row of this.targetNode.CTS) {
                    // 计算差值
                    for (let i = 0; i < colDiff; i++) {
                        row.pop()
                    }
                }
            }
            // 若行数增加
            if (this.row > initialRow) {
                // 单独表格行
                let singleRow = []
                for (let i = 0; i < this.col; i++) {
                    singleRow.push("")
                }
                for (let i = 0; i < rowDiff; i++) {
                    this.targetNode.CTS.push(singleRow)
                }
            } else { // 若行数减少
                for (let i = 0; i < rowDiff; i++) {
                    this.targetNode.CTS.pop()
                }
            }
        }
    },
    watch: {
        disabled(newVal) {
            if (!newVal) {
                this.tableGet()
            } else {
                this.targetNode = null
            }
        },
        row(newVal) {
            if (newVal < 1) {
                this.timeout = setTimeout(() => {
                    this.row = 1
                }, 1000)
            } else {
                clearTimeout(this.timeout)
            }
        },
        col(newVal) {
            if (newVal < 1) {
                this.timeout = setTimeout(() => {
                    this.col = 1
                }, 1000)
            } else {
                clearTimeout(this.timeout)
            }
        }
    }
}
</script>

<style scoped>
    /* Table Setter */
    .table-setter {
        display: flex;
        padding-left: 8px;
        background-color: white;
    }
    .input-group {
        margin-left: 8px;
        margin-right: 8px;
    }
    .inputter {
        width: 3em !important;
    }
    .hint {
        font-size: 24px;
    }
    .closer {
        width: auto;
        height: 100%;
        line-height: 54px;
        color: var(--default-text-color);
    }

    /* Transition */
    .slide-enter-from,
    .slide-leave-to {
        bottom: -54px;
    }
</style>