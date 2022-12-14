const imgExtnames = [
    "jpg", "jpeg",
    "png", "webp",
    "bmp", "svg",
    "gif", "psd",
]
export default {
    methods: {
        // 清除文件 input
        imgRevClear() {
            const imgRev = this.$refs.imgRev
            imgRev.value = ""
        },
        // 文件接受处理函数
        imgRevFunc() {
            const imgRev = this.$refs.imgRev
            const file = imgRev.files[0]
            const fileType = file.name.split(".")[1] // 获取文件拓展名
            if (!imgExtnames.includes(fileType)) {
                // 检查不为图片类型
                alert("文件不是正确的图像文件")
                this.imgRevClear()
            }
        }
    }
}