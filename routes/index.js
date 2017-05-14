var express = require('express');
var router = express.Router();
var i18n = require("i18n");

/* GET home page. */
router.get('/:language(|en|es)', function(req, res, next) {
  var language = req.params.language;
  req.setLocale(language);
  res.render('index', { title: 'Express', language: language });
});

module.exports = router;
