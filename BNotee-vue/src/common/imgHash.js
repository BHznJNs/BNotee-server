const cryptTable = []

// prepare `cryptTable`
let seed = 0x00100001;
for(let index1=0; index1<256; index1++) {
    for(let i=0; i<5; i++) {
        seed = (seed * 125 + 3) % 0x2AAAAB;
        const temp1 = (seed & 0xFFFF) << 0x10;
        const temp2 = (seed & 0xFFFF);
        cryptTable.push( temp1 | temp2 );
    }
}

/**
 * @param {String} str 
 * @returns {Number} hashed code
 */
function strHash(str) {
    let seed1 = 0x7FED7FED
    let seed2 = 0xEEEEEEEE

    for (let char of str) {
        const code = char.charCodeAt()
        seed1 = cryptTable[(1 << 8) + code] ^ (seed1 + seed2)
        seed2 = code + seed1 + seed2 + (seed2 << 5) + 3
    }
    return seed1
}

export default function imgHash(fileObj) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        if (fileObj) {
            // 转换为 base64
            reader.readAsDataURL(fileObj)
            reader.onload = () => {
                const hash = strHash(reader.result)
                resolve(hash)
            }
        } else {
            alert("图片文件获取失败")
            reject(null)
        }
    })
}