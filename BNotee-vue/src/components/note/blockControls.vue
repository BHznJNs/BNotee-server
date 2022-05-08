<template>
    <div
        class="controls"
        :class="{
            'disabled': disabled && !isTouchMode,
            'touch-mode': isTouchMode
        }"
    >
        <div
            class="btn btn-normal tool-btn"
            @click="addNode"
        >
            <i class="material-icons">add</i>
        </div>
        <slot></slot>
        <label class="checkbox">
            <input
                type="checkbox"
                ref="checkbox"
                :checked="selected"
                @change="selectEvent"
            />
            <i
                class="checkbox-icon"
                @touchstart="_touchstart"
                @touchend="_touchend"
            ></i>
        </label>
    </div>
</template>

<script>
import getNodeObj from "../mixin/getNodeObj"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            timeout: null
        }
    },
    props: [
        "isTouchMode",
        "disabled", "selected",
        "location", "parentType"
    ],
    inject: ["selectedNode"],
    mixins: [getNodeObj],
    methods: {
        _touchstart() {
            this.timeout = setTimeout(() => {
                this.addNode()
            }, 1000)
        },
        _touchend() {
            clearTimeout(this.timeout)
        },
        selectEvent() {
            // 返回对象是否 checked
            const checked = this.$refs.checkbox.checked
            this.getThisObj.SL = checked

            // 若被选择
            if (checked) {
                // 如果已有节点被选择
                if (this.selectedNode.loc) {
                    // 选取已被选择节点并取消选择
                    this.selectedNode.obj.SL = false
                }

                this.selectedNode.loc = this.location
                this.selectedNode.obj = this.getThisObj
                this.selectedNode.type = this.parentType
                // 若父组件为列表
                if (this.parentType == "list") {
                    this.selectedNode.type =
                        (this.$parent.isNested) ?
                            "nestedList" :
                            "notNestedList"
                }

                if (this.parentType == "table") {
                    EventBus.emit("table-selected")
                }
            } else { // 若取消选择
                this.selectedNode.loc = null
                this.selectedNode.obj = null
                this.selectedNode.type = null
            }
        },

        /* ------------ */

        tableAdder(CTS) {
            // 获取当前表格行数，列数
            const rowNum = CTS.length
            const colNum = CTS[0].length
            // 新行
            let newRow = []
            for (let i = 0; i < colNum; i++) {
                newRow.push("")
            }
            // 插入新行
            CTS.push(newRow)
            EventBus.emit("add-history", {
                loc: this.location,
                prop: "ROW",
                before: rowNum,
                after: rowNum + 1
            })
        },
        detailAdder(CTS) {
            // 为 详情 组件，直接添加 子段落元素
            CTS.push({
                CT: "",
                CL: "#333",
                SL: false
            })
            // 添加历史对象
            const loc = Object.create(this.location)
            loc.push(CTS.length - 1)
            EventBus.emit("add-history", {
                loc,
                prop: "IST"
            })
        },
        listAdder(CTS) {
            // 为 列表 组件，直接添加 子段落元素
            CTS.push({
                NT: "li",
                CT: "",
                CL: "#333",
                SL: false
            })
            // 添加历史对象
            const loc = Object.create(this.location)
            loc.push(CTS.length - 1)
            EventBus.emit("add-history", {
                loc,
                prop: "IST"
            })
        },
        floorAdder(CTS){
            // 添加事件监听
            EventBus.off("textfield-return-" + this.parentType)
            EventBus.on("textfield-return-" + this.parentType, (obj) => {
                // 向父元素添加节点
                if (obj) {
                    CTS.push(obj)
                }
                // 添加历史对象
                const loc = this.location
                loc.push(CTS.length - 1)
                EventBus.emit("add-history", {
                    loc,
                    prop: "IST"
                })
                // 移除事件监听
                EventBus.off("textfield-return-" + this.parentType)
            })

            EventBus.emit("textfield-open", this.parentType)
        },
        // 方法：打开全局输入组
        addNode() {
            const CTS = this.getThisObj.CTS

            switch (this.parentType) {
                case "table":
                    this.tableAdder(CTS)
                    break
                case "details":
                    this.detailAdder(CTS)
                    break
                case "list":
                    this.listAdder(CTS)
                    break
                case "floor":
                    this.floorAdder(CTS)
            }
        }
    }
}
</script>

<style scoped>
    /* tool Button */
    .tool-btn {
        width: 10%;
        min-width: 60px;
        max-width: 84px;
        height: 32px;
        line-height: 32px;
        margin: 0 40px 0;
        background-color: #CFD8DC;
    }
    /* Controls */
    .controls {
        display: flex;
        height: 32px;
        -webkit-box-sizing: border-box;
            box-sizing: border-box;
        transition: height .3s;
    }
    .controls.disabled {
        height: 0 !important;
        margin: 0;
    }
    
    /* Touch Mode */
    .touch-mode {
        position: absolute;
        top: 0;
        left: -44px;
    }
</style>
<style>
    .controls.disabled * {
        display: none;
    }
    .touch-mode .tool-btn {
        display: none;
    }
</style>