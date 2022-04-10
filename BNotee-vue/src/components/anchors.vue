<template>
    <div
        class="anchors-outer"
    >
        <div
            class="fullscreen-mask"
            :class="{ disabled }"
            @click="close"
        ></div>

        <div
            class="drawer"
            :class="{ disabled }"
        >
            <div class="titlebar shadow-4">
                <div class="closer circle">
                    <i
                        class="material-icons arrow-forward"
                        @click="close"
                    >arrow_forward</i>
                    <i
                        class="material-icons arrow-upward"
                        @click="close"
                    >arrow_upward</i>
                </div>
                <h1>笔记摘要</h1>
            </div>

            <div class="anchors-view-outer">
                <anchors-view
                    class="anchors-view"
                    v-show="anchorsViewShow"
                    :list="anchorList"
                />
            </div>

            <div
                class="load-mask"
                v-show="loading"
            ></div>
        </div>
    </div>
</template>

<script>
import { h } from "vue"
import EventBus from "../common/EventBus"

export default {
    data() {
        return {
            disabled: true,
            anchorsViewShow: false,
            loading: true,
            anchorList: []
        }
    },
    components: {
        AnchorsView: {
            props: ["list"],
            render() {
                let childrenList =
                    this.list.map((item) => {
                        return h(
                            "a",
                            {
                                level: item.level,
                                href: "#" + item.content
                            },
                            item.content
                        )
                    })

                return h("div", childrenList)
            }
        }
    },
    inject: ["note"],
    methods: {
        // 方法：返回笔记内所有锚点元素
        getAnchors(nodeList, level, callback) {
            let list = []
            for (let item of nodeList) {
                // 若为标题节点
                if (item.NT == "h") {
                    list.push({
                        content: item.CT,
                        level
                    })
                } else if (item.NT == "floor") {
                    const li = this.getAnchors(item.CTS, level+1)
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
            this.disabled=true
            this.anchorsViewShow=false
        }
    },
    mounted() {
        EventBus.on("open-anchors", () => {
            this.disabled = false
            setTimeout(() => {
                this.anchorsViewShow = true
            }, 1200)

            this.getAnchors(
                this.note.CTS, 1, (list) => {
                    this.anchorList = list
                    this.loading = false
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
    .load-mask {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(51, 51, 51, 0.3);
    }
    
    .anchors-view-outer {
        position: absolute;
        top: 60px;
        bottom: 0;
        width: 100%;
        padding-top: 16px;
        overflow: auto;
    }
    .anchors-view {
        display: flex;
        flex-direction: column;
        padding-left: 16px;
    }

    /* Title Bar */
    .titlebar {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 8px;
        margin-bottom: 16px;
        background-color: #333;
        color: white !important;
        z-index: 1;
    }
    .titlebar h1 {
        margin: 0;
        cursor: default;
        user-select: none;
    }
    /* Title Bar End */

    /* 横屏 */
    @media screen and (orientation: landscape) {
        .arrow-upward {
            display: none;
        }
    }
    /* 竖屏 */
    @media screen and (orientation: portrait) {
        .arrow-forward {
            display: none;
        }
    }
</style>