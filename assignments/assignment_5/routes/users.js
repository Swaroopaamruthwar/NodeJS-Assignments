const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bodyparser = require("body-parser");
const { body, param, validationResult } = require('express-validator');

router.use(bodyparser());
router.use(bodyparser.urlencoded({ extended: false }));
// Get Method to ->fetch/read the data
router.get("/", async (req, res) => {
    const users = await User.find();
    res.json({
        users
    });
})
// POST Method->create data
router.post("/register", body('email').isEmail(), body('name').isAlpha(), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        console.log(req.body);
        const user = await User.create(req.body);
        return res.status(200).json({
            status: "Success",
            data: user
        });
    } catch (e) {
        return res.json({
            status: "failed",
            message: e.message
        });
    }
});

// PUT Method-> update data
router.put("/:id", param("id").isMongoId(), async (req, res) => {
    try {
        await User.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).json({
            status: "Success",
            data: User
        });
    } catch (e) {
        console.log(e);
        return res.json({
            status: "failed",
            message: e.message
        });
    }
});

// PATCH Method-> update data
router.patch("/:id", async (req, res) => {
    try {
        await User.updateOne({ _id: req.params.id }, req.body);
        return res.status(200).json({
            status: "Success",
            data: User
        });
    } catch (e) {
        console.log(e);
        return res.json({
            status: "failed",
            message: e.message
        });
    }
});

// DELETE Method->update/modifying existing  data
router.delete("/:id", body("id").isMongoId(), async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        return res.status(200).json({
            status: "Success",
            data: User
        });
    } catch (e) {
        console.log(e);
        return res.json({
            status: "failed",
            message: e.message
        });
    }
});
// router.get("*", async (req, res) => {
//     res.status(404).json({
//         status: "failed",
//         message: "API NOT FOUND"
//     });
// })

module.exports = router;