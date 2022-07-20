const { readFileSync } = require("fs")

const conf = readFileSync("config.json", "utf-8")
const confObj = JSON.parse(conf)
globalThis.Config = confObj