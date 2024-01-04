// Create web server

const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/posts/:id/comments', isLoggedIn, commentsCtrl.create);
router.delete('/comments/:id', isLoggedIn, commentsCtrl.delete);

function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;
