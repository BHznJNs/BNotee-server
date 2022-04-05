<!-- 列表块组件，其中仅允许加入 列表块、列表项节点 -->
<template>
    <div
        class="list"
        :class="{ 
            'shadow-2': selected,
            'hover': hover,
            'empty': !children.length,
            'touch-mode': isTouchMode,
            'nested': isNested
         }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <list-child :ordered="isOrdered">
            <template
                v-for="(item, index) in children"
                :key="item.id"
            >
                <list-block
                    v-if="item.NT == 'list'"
                    :isOrdered="item.OL"
                    :selected="item.SL"
                    :children="item.CTS"
                    :location="location.concat([index])"
                    @mouse-in-child="onMouseLeave"
                />
                <basic-node
                    v-else
                    :tagName="'li'"
                    :content="item.CT"
                    :color="item.CL"
                    :selected="item.SL"
                    :location="location.concat([index])"
                />
            </template>
        </list-child>

        <block-controls
            :disabled="!hover"
            :isTouchMode="isTouchMode"
            :selected="selected"
            :location="location"
            :parentType="'list'"
        />
    </div>
</template>

<script>
import BasicNode from "./basicNode"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent"
import { h } from "vue"

export default {
    name: "list-block",
    data() {
        return {
            isNested: null
        }
    },
    components: {
        BasicNode, BlockControls,
        listChild: {
            props: ["ordered"],
            render() {
                return h(
                    this.ordered ? "ol" : "ul",
                    this.$slots.default()
                )
            }
        }
    },
    props: [
        "children", "isOrdered",
        "location", "selected"
    ],
    inject: ["isTouchMode"],
    mixins: [blockHoverEvent],
    mounted() {
        // 是否为嵌套列表
        const parentNode = this.$el.parentNode
        this.isNested = (
            parentNode.tagName == "OL" ||
            parentNode.tagName == "UL"
        )
    }
}
</script>