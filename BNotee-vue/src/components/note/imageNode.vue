<template>
    <div
        :class="{image: true, selected}"
        @contextmenu="selectEvent"
    >
        <img
            :class="{image: true, reverse}"
            @click="openImage" @error="imgLoadErr"
            :src="this.source" :alt="this.alt"
        />
        <hr class="image-divider">
        <basic-node
            class="alt-content"
            tagName="p" color="#333"
            v-show="!this.isLoadErr"
            :location="this.location"
            :content="this.alt"
        />
    </div>
</template>
<script>
import BasicNode from "./basicNode"
import selectEvent from "../mixin/nodeSelectEvent"

export default {
    data() {
        return {
            reverse  : false,
            selected : false,
            isLoadErr: false,
            source   : "/imgs/" + this.src,
        }
    },
    props: [
        "alt", "src",
        "location"
    ],
    components: { BasicNode },
    inject: ["selectedNode", "isDarkMode"],
    mixins: [selectEvent],
    methods: {
        imgLoadErr() {
            this.isLoadErr = true
            alert("图片获取失败: " + this.src)
        },
        openImage() {
            window.open(this.source)
        }
    },
    watch: {
        isDarkMode(newVal) {
            this.reverse = newVal
        }
    }
}
</script>
<style scoped>
div.image {
    width: fit-content;
    margin-bottom: 8px;
    padding: 8px 16px;
    box-shadow: var(--shadow-1);
    border-radius: 6px;
    transition: box-shadow .3s;
}
div.image.selected {
    box-shadow: var(--shadow-4);
}

/* 图像本体 */
img.image {
    cursor: pointer;
    max-width: 100%;
    max-height: 50vh;
}
img.image.reverse {
    mix-blend-mode: difference;
}

div.image hr.image-divider {
    border-top: solid 2px #999 !important;
    padding: 0 !important;
}
/* 图像注释 */
div.image .alt-content {
    width: fit-content;
    margin: 4px auto 0;
    text-align: center;
    text-decoration: underline;
}
</style>