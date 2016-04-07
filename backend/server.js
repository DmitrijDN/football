var bodyParser = require('body-parser'),
	config = require('./config'),
	express = require('express'),
	mongooseConnection = require('./db/dbconnect').connection,
	path = require('path'),
	session = require('express-session');

var app = express();

app.use(session({
	secret: config.session.secret,
	resave: true,
	saveUninitialized: true,
}));

var staticPath = path.normalize(__dirname + '/../public');
app.use(express.static(staticPath));

staticPath = path.normalize(__dirname + '/../bower_components');
app.use('/bower_components', express.static(staticPath));

app.use(bodyParser.json());

var apiRoutes = require('./routes/api/routes')(app);
var viewRoutes = require('./routes/view/routes')(app);

var server = app.listen(3060);

module.exports = app;