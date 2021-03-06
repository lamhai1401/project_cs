/**
 * Module dependencies.
 */
const express       = require('express');
const cors          = require('cors');
const body          = require('body-parser');
const path          = require('path');
const logger        = require('morgan');
const timeout       = require('connect-timeout');
const errorhandler  = require('errorhandler');
const mongoose      = require('mongoose');
const lusca         = require('lusca');
const mongo         = require('config').MONGODB.URI;
const index_url     = require('config').HOST.INDEX;
const handler       = require('./util/AppResponse');
const router        = require('./routes');
const verify_token  = require('./middleware/verify_token');
const dispatcher    = require('./middleware/dispatcher');
/**
 * Main app.
 */
const app = express();

/**
 * Static server libraries
 */
const compression = require('compression');
const mime = require('mime-types');
const fallback = require('connect-history-api-fallback');

app.use(cors());
app.use(body.json());
app.use(body.urlencoded({extended: true}));

app.use(logger('dev'));

/**
 * Connecting to mongodb
 */
mongoose.connect(mongo)
    .then(connection => {
        console.log('     [Mongodb] Connected to MongoDB');
        console.log('     ======================== \n');
    })
    .catch(error => {
        console.log('     [Mongodb] ' + error.message);
    });
mongoose.Promise = global.Promise;

/* add header */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Access-Token");
    next();
});

/* Static resources */
// app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(fallback({
    htmlAcceptHeaders: ['text/html', 'application/xhtml+xml']
}))

// serve static files
app.use(express.static(__dirname + '/build', {
    maxAge: "1y",
    setHeaders: function (res, path) {
        if (mime.lookup(path) === 'text/html') {
            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
            res.setHeader('Pragma', 'no-cache');
        }
    },
}));

/**
 * Middleware
 */
app.use(handler);
app.use(timeout('10s'));
app.use(haltOnTimedout);
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use(errorhandler());
app.use(compression());
app.use(verify_token);
app.use(dispatcher);



// app router connection
app.use(index_url, router);

function haltOnTimedout (req, res, next) {
    if (!req.timedout) return next();
    return res.responseError("CONNECTION_TIMEOUT", "Press F5 to refresh it");
}

module.exports = app;
