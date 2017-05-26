var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var i18n = require("i18n");
var index = require('./routes/index');
var app = express();

// app configuration
i18n.configure({
    // setup some locales - other locales default to en silently
    locales:['en', 'es'],
    // where to store json files - defaults to './locales' relative to modules directory
    directory: __dirname + '/locales',
    // fall back from one language to another if the given one could not be found
    //fallbacks:{'es': 'en'},
    // you may alter a site wide default locale
    defaultLocale: 'en',
    // watch for changes in json files to reload locale on updates - defaults to false
    autoReload: true,
    // setting prefix of json files name - default to none '' (in case you use different locale files naming scheme (webapp-en.json), rather then just en.json)
    // this can be used for different subdomain needs (e.g regulators)
    prefix: 'cy-',
    objectNotation: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
// default: using 'accept-language' header to guess language settings
app.use(i18n.init);

/** 
 * Middleware to be invoked before each action
 */
app.use(function(req, res, next) {
    // set locale on the same given the url
    var rxLocal = /^\/(en|es)/i;
    if(rxLocal.test(req.url)){
        var arr = rxLocal.exec(req.url);
        var local=arr[1];
        // i18n.setLocale(local);
		req.setLocale(local);
    }
    // no need to set default, as it's being set from i18n.configure
    // move to the next route
    next();
});

/* --> Add Middleware to execute before routes <-- */

app.use('/', index);

/* --> Add Middleware to execute after routes <-- */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
