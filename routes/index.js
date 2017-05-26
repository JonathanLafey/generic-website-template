var express = require('express');
var router = express.Router();
var i18n = require("i18n");

/**
 * Homepage
*/
router.get('/:language(|en|es)', function(req, res, next) {
    // TODO: see how language variable can be set by middleware and be available on all templates
    // TODO: also try to rewrite rules without the need of the language variable
    res.render('index', { title: 'Express', language: req.getLocale() });
});

module.exports = router;
