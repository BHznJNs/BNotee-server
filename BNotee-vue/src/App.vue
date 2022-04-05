<template>
    <div
        class="dark-filter"
        :class="{ 'darken': isDarkMode }"
    ></div>
    <tool-bar :isTouchMode="isTouchMode"/>
    <uploader/>
    <control-balls
        :isDarkMode="isDarkMode"
        :isTouchMode="isTouchMode"
        :isFullscreen="isFullscreen"
        @toggle-darkMode="isDarkMode = !isDarkMode"
        @toggle-touchMode="isTouchMode = !isTouchMode"
        @toggle-fullscreen="isFullscreen = !isFullscreen"
    />
    <msgbar/>
    <note
        :isFullscreen="isFullscreen"
        :isTouchMode="isTouchMode"
    />

    <fixed-components/>
</template>

<script>
import { computed } from "vue"
import ToolBar from "./components/toolBar"
import Uploader from "./components/uploader"
import ControlBalls from "./components/controlBalls"
import Note from "./components/note"
import FixedComponents from "./components/fixedComponents"
import Msgbar from "./components/msgbar"
import defaultContent from "./common/defaultContent"

export default {
    name: 'App',
    components: {
        Note, Uploader,
        ControlBalls,
        ToolBar, Msgbar,
        FixedComponents
    },
    data() {
        return {
            note: defaultContent,
            selectedNode: {
                location: null,
                type: null,
                tagName: null
            },
            isDarkMode: false,
            isTouchMode: false,
            isFullscreen: false
        }
    },
    provide() {
        return {
            note: this.note,
            selectedNode: this.selectedNode,
            isTouchMode: computed(() => {return this.isTouchMode})
        }
    }
}
</script>

<style>
    #app {
        background-color: #F5F5F5;
    }

    .dark-filter {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; 
        z-index: 9999;
        mix-blend-mode: difference;
        background-color: #e0e0e000;
        pointer-events: none;
        transition: background-color 1.2s;
    }
    .dark-filter.darken {
        background-color: #e0e0e0;
    }
</style>