const { readFileSync } = require("fs")
const ini = require("ini")

let conf = readFileSync("config.ini", "utf-8")
conf = ini.parse(conf)

globalThis.Config = conf
