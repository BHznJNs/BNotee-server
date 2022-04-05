export default (tagName, content) => {
    // 若未输入内容
    if (!content) {
        return null
    }

    // 定义初始对象
    let obj = {
        NT: tagName,
        SL: false
    }

    switch (tagName) {
        case "h":
        case "p":
        case "li":
            obj.CT = content
            obj.CL = "#333"
            break
        case "hr":
            break
        case "floor":
            obj.CTS = []
            if (content) {
                obj.CTS.push({
                    NT: "h",
                    CT: content,
                    CL: "#333",
                    SL: false
                })
            }
            break
        case "ol":
            obj.NT = "list"
            obj.CTS = []
            obj.OL = true
            break
        case "ul":
            obj.NT = "list"
            obj.CTS = []
            obj.OL = false
            break
        case "table":
            obj.CTS = [
                ["", "", "", ""],
                ["", "", "", ""]
            ]
        break
        case "details":
            obj.SUM = content
            obj.CTS = [
                {
                    CT: "",
                    CL: "#333",
                    SL: false
                }
            ]
            break
    }

    return obj
}