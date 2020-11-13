const express = require("express");
const path = require("path")
const app = express();
const cors = require("cors");
const session = require('express-session');
var bodyparser = require('body-parser');
const mongoose = require("mongoose");
mongoose.promise = global.Promise;
require("dotenv").config();


// Body parser middleware

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit: '10mb'}));
app.use(cors());
app.use(require('morgan')('dev'));
app.use(session({ secret: 'passport-tutorial',
 cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false 
}));

// static folder
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(res => {console.log("success")})
.catch(res => {console.log(res)})
mongoose.set('debug', true);

// Models
require('./models/Todo');

// routes

app.use('/api/todos', require('./Routes/index'));
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});




const port = 8000;

app.listen(port)