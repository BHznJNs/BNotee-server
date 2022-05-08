<!-- 表格组件，不得包含其他组件 -->
<template>
    <div
        class="table shadow-1"
        :class="{
            'shadow-3': selected,
            'touch-mode': isTouchMode,
            'hover': hover && !isTouchMode
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
    >
        <!-- 遮挡右侧阴影 -->
        <div class="mask"></div>

        <table>
            <tbody>
                <table-row
                    v-for="(item, index) in children"
                    :key="item.id"
                    :children="item"
                    :location="location.concat(index)"
                />
            </tbody>
        </table>
        <block-controls
            :isTouchMode="isTouchMode"
            :disabled="!hover"
            :selected="selected"
            :location="location"
            :parentType="'table'"
        >
            <!-- 表格设置 -->
            <div
                class="btn btn-normal tool-btn"
                :class="{ 'disabled': !selected }"
                @click="openTableSetter"
            >
                <i class="material-icons">grid_on</i>
            </div>
        </block-controls>
    </div>
</template>
<script>
import EventBus from "../../common/EventBus"
import TableRow from "./tableRow"
import BlockControls from "./blockControls"
import blockHoverEvent from "../mixin/blockHoverEvent"

export default {
    props: [
        "selected",
        "children", "location"
    ],
    inject: ["isTouchMode"],
    mixins: [blockHoverEvent],
    components: {
        TableRow, BlockControls
    },
    methods: {
        openTableSetter() {
            EventBus.emit("fixedComponents-open", "tableSetter")
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
        margin: 0 40px 0 -20px;
        background-color: #CFD8DC;
    }
</style>