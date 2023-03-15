const news = require("./news")
const user = require("./user")

module.exports = (router) => {
    user(router)
    news(router)
}