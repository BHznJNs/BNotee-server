import imgHashFunc from "./imgHash"
import imgUpload from "./imgUpload"
import EventBus from "./EventBus"

function imgObjReturner(file, nodeObj) {
    return new Promise((resolve, reject) => {
        const fileExtnames = file.name.split(".")[1]

        imgHashFunc(file)
        .then(hash => {
            // 拼接文件名
            const source = `${nodeObj.CT}-${hash}.${fileExtnames}`
            nodeObj.SRC = source
            return imgUpload(file, source)
        }).then(() => {
            EventBus.emit("show-msg", "图片上传成功")
            resolve(nodeObj)
        }).catch(() => {
            alert("图片上传失败: " + file.name)
            reject(null)
        })
    })
}

export default (tagName, content, textfieldObj) => {
    // 若未输入内容
    if (!content) {
        return null
    }

    // 定义初始对象
    let obj = {
        NT: tagName,
    }

    switch (tagName) {
        case "h":
        case "p":
        case "li":
            obj.CT = content
            obj.CL = "#333"
            break
        case "img": {
            const imgRev = textfieldObj.$refs.imgRev
            const file = imgRev.files[0]
            obj.CT = content
            return imgObjReturner(file, obj)
        }
        case "link":
            obj.SRC = content
            obj.CT = ""
            obj.CL = "#333"
            break
        case "hr":
            break
        case "floor":
            obj.CTS = [{
                NT: "h",
                CT: content,
                CL: "#333",
            }]
            break
        case "ol":
            obj.NT = "list"
            obj.CTS = [{
                NT: "li",
                CT: content,
                CL: "#333",
            }]
            obj.OL = true
            break
        case "ul":
            obj.NT = "list"
            obj.CTS = [{
                NT: "li",
                CT: content,
                CL: "#333",
            }]
            obj.OL = false
            break
        case "code":
            obj.LG = content
            obj.CT = ""
            break
        case "table":
            obj.CTS = [
                [content, "", "", ""],
                ["", "", "", ""]
            ]
        break
        case "details":
            obj.SUM = content
            obj.CTS = [
                {
                    CT: "",
                    CL: "#333",
                }
            ]
            break
    }

    return obj
}