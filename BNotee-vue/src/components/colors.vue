<template>
    <transition name="slide">
    <div class="colors fixed-component" v-show="!disabled">
        <template v-for="(item) in colors" :key="item.id">
            <div
                class="color btn btn-shallow"
                :style="{ 'background-color': item }"
                @click="setColor(item)"
            ></div>
        </template>
        <div class="input-group">
            <div
                class="hint"
                @click="$refs.colorInputter.click()"
            >#</div>
            <input
                type="color"
                ref="colorInputter"
                v-show="false"
                v-model="colorValue"
            >
            <input
                class="inputter" placeholder="******"
                type="text" maxlength="8"
                v-model="colorValue"
            >
        </div>
        <div
            class="closer"
            @click="$emit('close', 'colors')"
        >
            <i class="material-icons">close</i>
        </div>
    </div>
    </transition>
</template>

<script>
import getNodeObj from "./mixin/getNodeObj"

export default {
    data() {
        return {
            colors: [
                "#D50000",
                "#FFD600",
                "#333"
            ],
            colorValue: "",
            timeout: null,
        }
    },
    props: ["disabled"],
    inject: ["selectedNode"],
    mixins: [getNodeObj],
    methods: {
        setColor(color) {
            this.getNodeObj({
                location: this.selectedNode.location,
                callback: (nodeArray, index) => {
                    nodeArray[index].CL = color
                }
            })
        }
    },
    watch: {
        colorValue(newValue) {
            clearTimeout(this.timeout)
            const color = newValue.replace("#", "")

            this.timeout = setTimeout(() => {
                this.setColor("#" + color)
            }, 300)
        }
    }
}
</script>

<style scoped>
    .colors {
        display: flex;
        align-items: center;
        width: calc(100% - 6rem);
    }
    .color {
        margin: auto;
    }
    .color:hover {
        filter: contrast(.6);
    }

    .inputter {
        width: 5.5em !important;
    }

    @media screen and (min-width: 1024px) {
        .colors {
            width: 60vw;
        }
        .inputter {
            width: 6em !important;
        }
    }
    
    /* Transition */
    .slide-enter-from,
    .slide-leave-to {
        transform: translateY(54px);
    }
</style>