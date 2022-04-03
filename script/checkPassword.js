const password = globalThis.Config.password
function pwChecker(pw) {
    return pw == password
}
module.exports = pwChecker