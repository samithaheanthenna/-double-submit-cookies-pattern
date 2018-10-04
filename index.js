'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nocache = require('nocache');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const app = express();
const PORT = 8070;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(nocache());
app.use(express.static('static'));

app.listen(PORT, function () {
    console.log("Server is listening on " + PORT);
});


app.get('/', function (req, res) {

    const sessionId = req.cookies['node-session'];
    const token = req.cookies['csrf-token'];

    if (sessionId && token) {
        res.sendFile('static/home.html', {root: __dirname});
    } else {
        res.sendFile('static/login.html', {root: __dirname});
    }

});

app.post('/home', function (req, res) {

    if (req.body.username === 'admin' && req.body.password === 'admin') {

        const sessionId = uuidv1();
        const _csrf = uuidv4();

        const session = req.cookies['node-session'];
        const token = req.cookies['csrf-token'];

        if (!session && !token) {

            res.setHeader('Set-Cookie', [`node-session=${sessionId}`, `csrf-token=${_csrf}`]);

        }
        res.sendFile('static/home.html', {root: __dirname});
    }
});

app.get('/home', function (req, res) {

    const sessionId = req.cookies['node-session'];
    const token = req.cookies['csrf-token'];

    if (sessionId && token) {
        res.sendFile('static/home.html', {root: __dirname});
    } else {
        res.sendFile('static/login.html', {root: __dirname});
    }
});

app.post('/comments', function (req, res) {

    const bodyToken = req.body._csrf;
    const token = req.cookies['csrf-token'];

    if (bodyToken === token) {
        res.redirect('/home.html?status=success');
    } else {
        res.redirect('/home.html?status=failed');
    }
});

app.post('/logout', function (req, res) {

    const sessionId = req.cookies['node-session'];
    const token = req.cookies['csrf-token'];

    res.clearCookie('node-session');
    res.clearCookie('csrf-token');
    res.sendFile('static/login.html', {root: __dirname});
})




