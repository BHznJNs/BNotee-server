<template>
   <div>
        <textfield-group-fixed
            @close="close"
            :disabled="textfieldGroupDisabled"
        />
        <colors
            @close="close"
            :disabled="colorsDisabled"
        />
        <table-setter
            @close="close"
            :disabled="tableSetterDisabled"
        />
   </div>
</template>

<script>
import TextfieldGroupFixed from "./textfieldGroupFixed"
import Colors from "./colors"
import TableSetter from "./tableSetter"
import EventBus from "../common/EventBus"

export default {
    data() {
        return {
            textfieldGroupDisabled: true,
            colorsDisabled: true,
            tableSetterDisabled: true
        }
    },
    components: {
        TextfieldGroupFixed,
        Colors, TableSetter
    },
    methods: {
        close(component) {
            this[component + "Disabled"] = true
            EventBus.emit("note-offset-cancel")
        }
    },
    mounted() {
        // textfield
        EventBus.on("textfield-open", () => {
            this.colorsDisabled = true
            this.tableSetterDisabled = true
            this.textfieldGroupDisabled = false
        })

        // Colors
        EventBus.on("colors-open", () => {
            this.tableSetterDisabled = true
            this.textfieldGroupDisabled = true
            this.colorsDisabled = false
        })

        // Table Setter
        EventBus.on("tableSetter-open", () => {
            this.colorsDisabled = true
            this.textfieldGroupDisabled = true
            this.tableSetterDisabled = false
        })


        EventBus.on("fixedComponents-close", () => {
            this.colorsDisabled = true
            this.textfieldGroupDisabled = true
            this.tableSetterDisabled = true
            EventBus.emit("note-offset-cancel")
        })
    }
}
</script>