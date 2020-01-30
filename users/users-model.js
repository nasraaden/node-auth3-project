const db = require("../data/db-config.js")

module.exports = {
    get,
    getBy,
    getById,
    insert
}

function get() {
    return db("users")
    .select("id", "username", "password")
}

function getBy() {

}

function getById(id) {

}

function insert(user) {

}
