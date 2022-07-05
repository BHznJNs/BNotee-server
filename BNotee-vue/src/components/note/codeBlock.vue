<template>
    <highlightjs
        :code="code"
        :language="language"
        @focusout="render"
        @contextmenu="select"
        v-once tabindex="0"
    />
</template>

<script>
import hljs from "highlight.js/lib/common"
import hljsVuePlugin from "@highlightjs/vue-plugin"
import getNodeObj from "../mixin/getNodeObj.vue"
import nodeSelectEvent from "../mixin/nodeSelectEvent"

export default {
    data() {
        return {
            tagName: "code",
            codeNode: null,
            selected: false
        }
    },
    components: {
        highlightjs: hljsVuePlugin.component
    },
    mixins: [getNodeObj, nodeSelectEvent],
    inject: ["selectedNode"],
    props: ["language", "code", "location"],
    methods: {
        render() {
            const code = this.codeNode.innerText
            this.getThisObj.CT = code
            this.codeNode.innerHTML = code
            hljs.highlightElement(this.codeNode)
        },
        select() {
            this.selectEvent()
            this.codeNode
                .classList
                .toggle("selected", this.selected)
        }
    },
    mounted() {
        this.codeNode = this.$el.querySelector("code")
        this.codeNode.contentEditable = true
        this.codeNode.addEventListener("keydown", (e) => {
            if (e.keyCode == 9) {
                e.preventDefault()
                const targetNode = window.getSelection().getRangeAt(0).startContainer
                const originText = targetNode.textContent
                if (originText.includes(
`{

}`)) {
                    targetNode.textContent = 
`{
    
}`
                } else {
                    targetNode.textContent = "    " + originText
                }
            }
        })
    }
}
</script>

<style>
pre code.hljs {
    outline: none;
    border-radius: 8px;
    transition: box-shadow .4s;
}
pre code.hljs.selected {
    box-shadow: var(--shadow-4);
}
</style>