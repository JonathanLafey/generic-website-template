var express = require('express');
var router = express.Router();
var i18n = require("i18n");

/**
 * Homepage
*/
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Express' });
});


module.exports = router;
