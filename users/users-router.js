const express = require("express");

const router = express.Router();

const Users = require("../users/users-model.js");

const restricted = require("../middleware/restricted.js");

router.get("/", restricted, (req, res) => {
    Users.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error getting the users."})
    })
})

module.exports = router;