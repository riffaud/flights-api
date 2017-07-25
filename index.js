var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var { filterQantasSydneyFlights, flattenFlightData } = require('./src/flight-data');
// let heroku define port
var port = process.env.PORT || 8080;

// a valid payload has a defined body with flights data
function isValidFlightsPayload(requestBody) {
    return requestBody !== undefined && requestBody.flights !== undefined;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set error message when JSON is malformed
app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400);
        res.send({ error: "error parsing JSON" });
    } else {
        next();
    }
});

// set common json header for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// filter flight data then map it to a flattened format
// an error will be returned if the root elements of the payload are not defined
// if flight data used for filtering is missing it will ignore the element
app.post('/flights', (req, res) => {
    if (!isValidFlightsPayload(req.body)) {
        res.status(400);
        res.send({ error: "incomplete data" });
        return;
    }

    var flights = req.body.flights.filter(filterQantasSydneyFlights);

    res.send({ flights: flattenFlightData(flights) });
});

app.listen(port, () => {
    console.log('App started and running on port %s!', port);
});

module.exports = app;
