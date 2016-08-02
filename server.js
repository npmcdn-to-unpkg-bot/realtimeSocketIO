// modules -----------------
var port = process.env.PORT || 8181;

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    user = {};
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

server.listen(port);

// config file connection db
// var db = require('./config/db');


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.app+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));

// routes
require('./app/routes')(app);
io.sockets.on('connection', function (socket) { 
     
    socket.on('send message', function (data) {   
        var sendMsg = { msg: data.msg, nick: data.username };
        io.sockets.emit('new message', sendMsg);
    });
    
    socket.on('new user', function (data, callback) {
        if (data in user) {
            callback(false);
        } else {
            callback(true);
            socket.name = data;           
            user[socket.name] = 1;
            updateNicks();
        }
    });  

    socket.on('disconnect', function (data) {
        if (!socket.name) return;
        delete user[socket.name];
        updateNicks();
    });

    function updateNicks() {
        io.sockets.emit('usernames', user);
    }

});

exports = module.exports = app;
console.log('Server Active on port ' + port);