<script>
export default {
    methods: {
        // 方法：判断 文件/文件夹 类型 并 获取 文件/文件夹 名称
        //      返回 类型 及 名称
        getData(loc) {
            const item = this.noteList[loc[0]]

            let type, name
            // 文件夹内文件
            if (loc.length == 2) {
                type = "file"
                const folder = item[1]
                const folderName = item[0]
                const fileName = folder[loc[1]]
                name = `${folderName}/${fileName}`
            } else { // 不在文件夹内
                if (typeof item == "string") {
                    // 文件
                    type = "file"
                    name = item
                } else if (typeof item == "object") {
                    // 文件夹
                    type = "folder"
                    name = item[0]
                }
            }
            return { type, name }
        }
    }
}
</script>