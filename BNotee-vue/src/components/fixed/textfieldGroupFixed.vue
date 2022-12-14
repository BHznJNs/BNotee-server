<template>
    <transition name="slide">
    <div
        class="textfield-group fixed-component fixed"
        v-show="!disabled"
    >
        <input
            @change="imgRevFunc"
            type="file" ref="imgRev"
            style="display: none"
        >
        <select
            @change="focus"
            class="selector" ref="selector"
            v-show="!isFromNestedList"
        >
            <option value="h">标题</option>
            <option value="p">段落</option>
            <option value="img">图片</option>
            <option value="link">链接</option>
            <option value="hr">割线</option>
            <option value="floor">层次</option>
            <option value="ol">序列</option>
            <option value="ul">乱列</option>
            <option value="code">代码</option>
            <option value="table">表格</option>
            <option value="details">详情</option>
        </select>
        <select
            class="selector" ref="selector4List"
            v-show="isFromNestedList"
        >
            <option value="li">列项</option>
            <option value="ol">序列</option>
            <option value="ul">乱列</option>
        </select>

        <div
            class="textfield" ref="inputter"
            contenteditable="true"
            @keydown.enter="onEnter"
        ></div>
        <div
            class="textfield-closer closer"
            @click="closeTextfield"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
    </transition>
</template>

<script>
import EventBus from "../../common/EventBus"
import nodeObjReturner from "../../common/nodeObjReturner"
import imgRevMixin from "../mixin/imgRev"

export default {
    data() {
        return {
            commandFrom: ""
        }
    },
    props: ["disabled"],
    inject: ["selectedNode"],
    mixins: [imgRevMixin],
    computed: {
        // 判断是否来自嵌套列表或列表内
        isFromNestedList() {
            return this.commandFrom == "list" || 
                   ["li", "nestedList"]
                   .includes(this.selectedNode.type)
        }
    },
    mounted() {
        EventBus.on("textfield-open", (from) => {
            this.commandFrom = from
            setTimeout(() => {
                this.focus()
            }, 600)
        })
    },
    methods: {
        // 同时按下 alt 和 enter 时
        onEnter(e) {
            if (e.altKey) {
                e.preventDefault()
                this.closeTextfield()
            }
        },
        focus() {
            const selector  = this.$refs.selector
            const textfield = this.$refs.inputter
            const imgRev    = this.$refs.imgRev
            if (selector.value == "img") {
                imgRev.click()
            }
            textfield.focus()
        },
        // 方法：关闭文本框，并将值返回给父节点
        async closeTextfield() {
            this.$emit("close", "textfieldGroup")
            // 获取对应数据
            const tagName = !this.isFromNestedList ?
                            this.$refs.selector.value :
                            this.$refs.selector4List.value
            const content = this.$refs.inputter.innerText
            // 定义返回对象
            const returnObj = await nodeObjReturner(tagName, content, this)
            // 传值
            EventBus.emit("textfield-return-" + this.commandFrom, returnObj)

            this.$refs.inputter.blur()
            this.$refs.inputter.innerText = ""
        }
    }
}
</script>