const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const bodyparser = require("body-parser");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
const { body, param, validationResult } = require('express-validator');
const SECRET = "RESTAPI";
router.use(bodyparser());
router.use(bodyparser.urlencoded({ extended: false }));
router.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.status(200).json({
        status: "success",
        posts
    });
})

router.post("/posts", async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            body: req.body.body,
            img: req.body.img,
            user: req.user
        })
        res.status(200).json({
            status: " post created  successfully",
            data: post
        })
    }
    catch (e) {
        res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }
})

router.put("/posts/:id", async (req, res) => {
    // const post = await Post.updateOne({_id: req.params.id, user: req.user}, {body: req.body.body});
    const updatedPost = await Post.updateOne({ _id: req.params.id }, req.body)
    if (updatedPost) {
        res.status(200).json({
            status: "Post updated Successfully!",
        })
    } else {
        res.status(400).json({
            status: "User can not update this post ,Sorry!!!"
        })
    }

})

router.delete("/posts/:id", async (req, res) => {
    try {
        const deletedPost = await Post.deleteOne({ _id: req.params.postId })
        if (deletedPost) {
            res.status(200).json({
                status: "Post Deleted",
            })
        } else {
            res.status(400).json({
                status: "not Authorise to delete this post",
            })
        }
    }
    catch (e) {
        return res.status(500).json({
            status: "Failed",
            message: e.message
        })
    }

})

module.exports = router;