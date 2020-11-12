const express = require("express");
const path = require("path")
const app = express();
const cors = require("cors");
const session = require('express-session');
var bodyparser = require('body-parser');


// Body parser middleware

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json({limit: '10mb'}));
app.use(cors());
app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: 'passport-tutorial',
 cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false 
}));



// Models and routes

app.use('/api/todos', require("./Routes/expressroutes"));



const port = 8000;

app.listen(port)