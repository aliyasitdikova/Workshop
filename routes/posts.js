var express = require('express');
var router = express.Router();
var models = require('../models')
/* GET list pf posts. */
router.get('/', function(req, res, next) {
    models.Post.all().then(function(posts) {
        res.render('posts/index', { 
            title: 'Posts',
            posts: posts
        });
    });
});
/* GET a specific post */
router.get('/:id', function(req, res, next) {
    models.Post.findById(req.params.id).then(function(post) {
        res.render('posts/show', {
        title: 'Show Post',
        post: post
    });
});
});

module.exports = router;


