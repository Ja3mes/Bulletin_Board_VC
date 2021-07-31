const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require('../model/user')
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();
const bruteforce = new ExpressBrute(store);
router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            console.log(req.body.password, req.body.email, req.body.username);
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});
router.post("/login",
    bruteforce.prevent,
    (req, res, next) => {
        let fetchedUser;
        User.findOne({ email: req.body.email })
            .then(user => {
                console.log(user);
                if (!user) {
                    return res.status(401).json({
                        message: "Authentication Failed, try again "
                    });
                }
                fetchedUser = user;
                return bcrypt.compare(req.body.password, user.password)
            })
            .then(result => {
                console.log("2", result);
                if (!result) {
                    return res.status(401).json({
                        message: "Authentication Failure "
                    });
                }
                const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
                    'secret_this_should_be_longer_time_is', {
                        expiresIn: '1h'
                    });
                console.log(token);
                res.status(200).json({
                    token: token
                });
            })
            .catch(err => {
                console.log(err);
                return res.status(401).json({
                    message: "Authentication Failure"
                });
            })
    });
module.exports = router;