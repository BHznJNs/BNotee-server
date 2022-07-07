function indent(str, level) {
    level -= 1
    const strArray = str.split("\n")
    let result = ""

    for (const item of strArray) {
        if (item != "") {
            // 如果不是空行
            result += "  ".repeat(level)
        }
        result += item + "\n"
    }
    return result
}

function heading(str, level) {
    let result = ""
    result += "#".repeat(level) + " "
    result += str
    result += "\n\n"
    return result
}
function code(str, lang) {
    let result
    result += "```"
    result += lang
    result += "\n"
    result += str
    result += "\n"
    result += "```\n"
    return result
}

function returner() {
    // 
}

// import raw from "./defaultContent"
const raw = require("./defaultContent")
function exportMd(raw) {
    let result = ""
    let level = 1

    const content = raw.CTS
    for (const item of content) {
        switch (item.NT) {
            case "h":
                heading(item.CT, level)
                break
            case "p":
                result += item.CT
                result += "\n\n"
                break
            case "hr":
                result += "* * *\n\n"
                break
            case "code":
                code(item.CT, item.LG)
                break
        }
    }
    console.log(result)
}

const testStr = `aaaa
bbbb

cccc`
indent(testStr, 2)
// exportMd(raw)
// export default exportMd