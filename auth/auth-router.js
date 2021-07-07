const express = require("express");

const router = express.Router();

const bc = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { jwtSecret } = require("../config/secret.js");

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {
    const user = req.body;
    const hash = bc.hashSync(user.password, 10);
    user.password = hash;

    Users.insert(user)
    .then(saved => {
        res.status(201).json(saved)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while signing up."})
    })
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    Users.getBy({ username })
    .first()
    .then(user => {
        if (user && bc.compareSync(password, user.password)) {
            const token = signToken(user);
            res.status(200).json({token});
        } else {
            res.status(401).json({message: "Invalid credentials."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "Error while logging in."})
    })
})

function signToken(user) {
    const payload = {
        userId: user.id,
        username: user.username,
        department: user.department
    };
    const options = {
        expiresIn: "1d"
    };
    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;


