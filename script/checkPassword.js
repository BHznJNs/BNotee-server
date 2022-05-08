const password = globalThis.Config.password

/**
 * @param {number} pw
 * @returns boolean
 */
function checker(pw) {
    return pw == password
}
module.exports = checker