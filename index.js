var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ error: "error parsing JSON" }));
    } else {
        next();
    }
});

app.post('/flights', (req, res) => {
    var flights = req.body.flights;
});

app.listen(3000, () => {
    console.log('App started and running on port 3000!');
});

module.exports = app;