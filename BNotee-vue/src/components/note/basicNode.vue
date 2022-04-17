<script>
import { h } from "vue"
import getNodeObj from "../mixin/getNodeObj"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            initialContent: this.content,
            editing: false,
            dbTouch: false
        }
    },
    inject: ["selectedNode"],
    props: [
        "tagName", "content",
        "location", "selected",
        "color"
    ],
    mixins: [getNodeObj],
    methods: {
        // 方法：右键节点时，触发选择节点事件
        selectEvent() {
            if (this.selected) {
                // 关闭全局组件
                EventBus.emit("fixedComponents-close")
                // 如果节点已被选择，取消选择
                this.selectedNode.loc = null
                this.selectedNode.obj = null
                this.selectedNode.type = null
                this.getThisObj.SL = false
            } else {
                // 如果已有节点被选择
                if (this.selectedNode.loc) {
                    // 选取已被选择节点并取消选择
                    this.selectedNode.obj.SL = false
                }
                this.selectedNode.loc = this.location
                this.selectedNode.obj = this.getThisObj
                this.selectedNode.type = this.tagName
                this.getThisObj.SL = true
            }
        }
    },
    render() {
        return h(this.tagName, {
            contentEditable: true,
            class: {
                "selected": this.selected,
                "editing": this.editing,
            },
            style: {
                "color": this.color
            },
            onContextmenu: (e) => {
                e.preventDefault()
                this.selectEvent()
            },
            onTouchstart: () => {
                // 双击选择
                if (this.dbTouch) {
                    this.selectEvent()
                }
                this.dbTouch = true
                setTimeout(() => {
                    this.dbTouch = false
                }, 300)
            },
            onClick: (e) => {
                // 储存修改前节点内容
                this.initialContent = e.target.innerText
                this.editing = true
            },
            onBlur: (e) => {
                const resultContent = e.target.innerText
                // 若节点中文本发生改变
                if (resultContent != this.initialContent) {
                    // 修改 this.note 中对应对象数据
                    this.getThisObj.CT = resultContent
                    EventBus.emit("add-history", {
                        loc: this.location,
                        prop: "CT",
                        before: this.initialContent,
                        after: resultContent
                    })
                    this.initialContent = resultContent
                }
                this.editing = false
            }
        }, this.content)
    }
}
</script>