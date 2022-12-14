<template>
    <div
        class="textfield-group shadow-2"
        :class="{ 'disabled': !isAdding }"
    >
        <input
            @change="imgRevFunc"
            type="file" ref="imgRev"
            style="display: none"
        >
        <select
            @change="focus"
            class="selector"
            ref="selector"
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
        <div
            class="textfield"
            contenteditable="true"
            ref="inputter"
            @keydown.enter.prevent="closeNodeAdder"
        ></div>
        <div
            class="textfield-closer closer"
            @click="closeNodeAdder()"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
</template>

<script>
import nodeObjReturner from "../common/nodeObjReturner"
import imgRevMixin from "./mixin/imgRev"

export default {
    props: ["isAdding"],
    inject: ["note"],
    mixins: [imgRevMixin],
    methods: {
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
        async closeNodeAdder() {
            const selector = this.$refs.selector
            const textfield = this.$refs.inputter

            const tagName = selector.value
            const content = textfield.innerText
            // 返回对象
            const returnObj = await nodeObjReturner(tagName, content, this)

            this.$emit("return-node", returnObj)

            textfield.blur()
            textfield.innerText = ""
        }
    }
}
</script>