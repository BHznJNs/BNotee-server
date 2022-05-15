import { h } from "vue"

// 标识字符数组
const keyTermArray = [
    "#",
    "`",
    "_",
    "/",
    "-",
    ":"
]
// 标识字符 对应 HTML 标签 对照
const keyToken_tagName_map = {
    "##": "strong",
    "``": "code",
    "__": "u",
    "//": "i",
    "--": "del",
    "::": "span"
}

/**
 * @function tokenizer
 * @description Tokenize the raw text
 * @param text {string} raw text
 * @returns {[]} termArray
 */
function tokenizer(text) {
    const termArray = []
    let textTerm = ""
    let keyTerm = ""

    for (let t of text) {
        if (keyTermArray.includes(t)) {
            // 标识字符 `#`
            if (t == keyTerm) {
                // 重复标识字符 `##`

                termArray.push({
                    type: "text",
                    content: textTerm.slice(0, -1)
                })
                termArray.push({
                    type: "key",
                    content: t.repeat(2)
                })

                keyTerm = ""
                textTerm = ""
            } else {
                textTerm += t
                keyTerm = t
            }
        } else {
            // 若 keyTerm 不为空字符串
            if (keyTerm.length) {
                keyTerm = ""
            }
            textTerm += t
        }
    }
    // 加入末尾 term
    if (textTerm.length) {
        termArray.push({
            type: "text",
            content: textTerm
        })
    }

    return termArray
}

/**
 * @function analyser
 * @param {[]} termArray 
 * @returns {[]} tokenArray
 */
 function analyser(termArray) {
    const tokenArray = []
    let status = ""
    let token = ""

    for (let termObj of termArray) {
        const termContent = termObj.content
        token += termContent

        if (termObj.type == "key") {
            // 标识字符
            if (status == "key") {
                const tagName = keyToken_tagName_map[termContent]
                tokenArray.push({
                    tagName,
                    content: token
                })
                status = ""
                token = ""
            } else {
                status = "key"
            }

        } else {
            // 普通字符
            if (status != "key") {
                tokenArray.push({
                    tagName: "text",
                    content: token
                })
                token = ""
            }
        }
    }
    // 加入末尾 token
    if (token.length) {
        const arrayLastEl = tokenArray[tokenArray.length - 1]
        arrayLastEl.content += token
    }

    return tokenArray
}

/**
 * @function vnodeGenerator
 * @param {[]} tokenArray 
 * @returns {[]} vnodeArray
 */
function vnodeGenerator(tokenArray) {
    const vnodeArray = []

    for (let token of tokenArray) {
        if (token.tagName == "text") {
            vnodeArray.push(token.content)
        } else {
            vnodeArray.push(h(
                token.tagName,
                token.content
            ))
        }
    }

    return vnodeArray
}


function compiler(rawText) {
    if (!rawText) {
        return null
    }
    // console.log(rawText)
    const termArray = tokenizer(rawText)
    // console.log(termArray);
    const tokenArray = analyser(termArray)
    // console.log(tokenArray);
    const vnodeArray = vnodeGenerator(tokenArray)
    // console.log(vnodeArray);

    return vnodeArray
}

export default compiler
