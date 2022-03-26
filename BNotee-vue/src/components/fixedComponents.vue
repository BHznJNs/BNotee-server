<template>
   <div>
        <textfield-group-fixed :disabled="textfieldgroupDisabled"/>
        <colors :disabled="colorsDisabled"/>
        <table-setter :disabled="tableSetterDisabled"/>
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
            textfieldgroupDisabled: true,
            colorsDisabled: true,
            tableSetterDisabled: true
        }
    },
    components: {
        TextfieldGroupFixed,
        Colors, TableSetter
    },
    mounted() {
        // textfield
        EventBus.on("textfield-open", () => {
            this.colorsDisabled = true
            this.tableSetterDisabled = true
            this.textfieldgroupDisabled = false
        })
        EventBus.on("textfield-close", () => {
            this.textfieldgroupDisabled = true
        })

        // Colors
        EventBus.on("colors-open", () => {
            this.tableSetterDisabled = true
            this.textfieldgroupDisabled = true
            this.colorsDisabled = false
        })
        EventBus.on("colors-close", () => {
            this.colorsDisabled = true
        })

        // Table Setter
        EventBus.on("tableSetter-open", () => {
            this.colorsDisabled = true
            this.textfieldgroupDisabled = true
            this.tableSetterDisabled = false
        })
        EventBus.on("tableSetter-close", () => {
            this.tableSetterDisabled = true
        })
    }
}
</script>