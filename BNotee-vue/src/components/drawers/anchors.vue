<template>
    <div>
        <drawer
            :title="'笔记摘要'"
            :disabled="drawerDisabled"
            @close-drawer="drawerDisabled = true"
        >
            <anchors-view :list="anchorList"/>
        </drawer>
    </div>
</template>

<script>
import { h } from "vue"
import Drawer from "./drawer"
import EventBus from "../../common/EventBus"

export default {
    data() {
        return {
            drawerDisabled: true,
            anchorList: []
        }
    },
    components: {
        Drawer,
        AnchorsView: {
            props: ["list"],
            render() {
                let childrenList =
                    this.list.map((item) => {
                        return h(
                            "a", {
                                level: item.level,
                                href: "#" + item.target
                            }, item.content
                        )
                    })

                return h("div", childrenList)
            }
        }
    },
    inject: ["note"],
    methods: {
        // 方法：返回笔记内所有锚点元素
        getAnchors() {
            const anchors = document.querySelectorAll(".heading")
            let anchorList = []
            for (let a of anchors) {
                console.log(a)
                anchorList.push({
                    level: a.tagName,
                    href: a.id,
                    content: a.innerText
                })
            }

            return anchorList
        },
        close() {
            this.drawerDisabled = true
        }
    },
    mounted() {
        EventBus.on("open-anchors", () => {
            this.drawerDisabled = false

            const list = this.getAnchors()
            this.anchorList = list
        })
    }
}
</script>

<style scoped>
    .fullscreen-mask {
        cursor: pointer;
    }
</style>