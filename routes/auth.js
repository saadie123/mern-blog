const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const config = require("../config");
const User = require("../models/User");

router.post("/signup", async (req, res) => {
    try {
        const oldUsername = await User.findOne({
            username: req.body.username
        });
        if (oldUsername) {
            return res.status(400).json({
                error: "Username is already in use"
            });
        }
        console.log('ok2');

        const oldEmail = await User.findOne({
            email: req.body.email
        });
        if (oldEmail) {
            return res.status(400).json({
                error: "Email is already in use"
            });
        }

        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });
        const savedUser = await user.save();
        const payload = {
            id: savedUser._id,
            name: savedUser.name,
            username: savedUser.username,
            email: savedUser.email
        };
        const token = jwt.sign(payload, config.secret, {
            expiresIn: "24hr"
        });
        res.json({
            token,
            message: "Your account has been registered successfully."
        });
    } catch (error) {
        res.status(400).json(error);
    }
});


router.post("/signin", async function (req, res) {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user) {
            return res.status(404).send({
                error: "Invalid username"
            });
        }
        const matched = await bcrypt.compare(req.body.password, user.password);
        if (!matched) {
            return res.status(400).send({
                error: "Invalid password"
            });
        }
        const payload = {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
        };
        const token = jwt.sign(payload, config.secret, {
            expiresIn: "24h"
        });
        res.json({
            token,
            message: "Logged in successfully"
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;