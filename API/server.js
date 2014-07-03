var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();
mongoose.connect('mongodb://localhost/rocketdDb');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback(){
    console.log('This is working');
})

app.use(express.bodyParser());
app.use(cors());


//app.all('/debts', function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
//    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
//    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
//    next();
//});

var api = require('./api.js');

app.get('/debts', api.get);
app.get('/debts/:id',api.findById);
app.post('/debts', api.post);
app.delete('/debts/:id',api.delete);



app.listen(8097);
module.exports = app;