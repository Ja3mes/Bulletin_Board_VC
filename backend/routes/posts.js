const express = require("express");
const router = express.Router();
const post = require('../model/post')
const CheckAuth = require('../middleware/check-auth');
router.post('', post.CheckAuth, (req, res, next) => {
    const posts = new post({
        Title: req.body.Title,
        Content: req.body.Content,
    });
    posts.save()
        .then((createdPost) => {
            console.log(createdPost);
            res.status(201).json({
                message: 'post successfully created',
                orderID: createdPost._id
            });
            console.log(posts);
        });
});
router.get('', (req, res, next) => {
    Order.find().then((documents) => {
        res.json({
            message: 'Posts retrieved from Server successfully',
            posts: documents
        });
    });
});
router.delete("/:id",
    CheckAuth,
    (req, res, next) => {
        console.log(req.params.id);
        this.post.deleteOne({ _id: req.params.id })
            .then((result) => {
                console.log(result);
                console.log("Post Deleted from DB");
                res.status(200).json({ message: "Post Deleted from Database" });
            });
    });
module.exports = router;