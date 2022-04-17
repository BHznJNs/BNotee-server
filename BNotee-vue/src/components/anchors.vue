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
import EventBus from "../common/EventBus"

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
        getAnchors(nodeList, level, index, callback) {
            let list = []
            for (let i in nodeList) {
                const item = nodeList[i]
                i = index + i
                // 若为标题节点
                if (item.NT == "h") {
                    list.push({
                        content: item.CT,
                        target: i,
                        level
                    })
                } else if (item.NT == "floor") {
                    // level 最大为 4
                    const nextLevel = level < 4 ?
                                      level+1 : level

                    const li = this.getAnchors(
                        item.CTS, nextLevel, i
                    )
                    list.push(...li)
                }
            }
            // 在最顶层运行回调函数
            if (level == 1) {
                callback(list)
            } else {
                return list
            }
        },
        close() {
            this.drawerDisabled = true
        }
    },
    mounted() {
        EventBus.on("open-anchors", () => {
            this.drawerDisabled = false

            this.getAnchors(
                this.note.CTS, 1, "", (list) => {
                    this.anchorList = list
                }
            )
        })
    }
}
</script>

<style scoped>
    .fullscreen-mask {
        cursor: pointer;
    }
</style>