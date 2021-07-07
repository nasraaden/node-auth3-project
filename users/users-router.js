const express = require("express");

const router = express.Router();

const Users = require("../users/users-model.js");

const restricted = require("../middleware/restricted.js");

router.get("/", restricted, onlyDepartment("finance"), (req, res) => {
    Users.get()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error getting the users."})
    })
});

function onlyDepartment(department) {
    return function(req, res, next) {
        console.log(req.user.department)
        if (req.user && req.user.department && req.user.department.toLowerCase() === department) {
            next();
        } else {
            res.status(403).json({message: "Wrong department!"})
        }
    }
}

module.exports = router;

