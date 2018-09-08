// import { TIMEOUT } from 'dns';

// ### Dependencies ###
var express = require('express');
var app = express();
var promise = require('bluebird');
const compression = require('compression')
app.use(compression())
var bodyParser = require('body-parser');
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');
// const bcrypt = require('bcryptjs');
// This is posibly the issue for SSL connection. Socket.io fails to
var server = require('http').Server(app);
// var io = require('socket.io').listen(server);
var options = {
  promiseLib : promise
}
const enforce = require('express-sslify')
var os = require('os');
var pgp = require('pg-promise')(options);
require('dotenv').config()
// var myDatabase = require('./util/database.js');

// var db = myDatabase.database;

var path = require('path')
const indexRouter = require("./routes/index")
const pushNotifications = require('./routes/api/push_notifications')

app.use('/', indexRouter)
app.use('/push_notifications', pushNotifications)

// app.use(require('./routes/auth'))

app.set('view engine', 'ejs');
app.set('views', 'views');

// //Enforces HTTPS
if (os.homedir().indexOf('/localhost') != -1) {
  app.use(enforce.HTTPS({ trustProtoHeader: true })) 
}

app.use(express.static(path.join(__dirname, "public")));

server.listen(process.env.PORT || 4004, function () {
  console.log(`Listening on ${server.address().port}`);
});