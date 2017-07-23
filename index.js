var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

function filterQantasSydneyFlights(flight) {
    return flight.airline == 'QF' &&
        (flight.departure.airport == 'SYD' || flight.arrival.airport == 'SYD');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400);
        res.send(JSON.stringify({ error: "error parsing JSON" }));
    } else {
        next();
    }
});

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});


app.post('/flights', (req, res) => {
    var flights = req.body.flights.filter(filterQantasSydneyFlights);
    var flattenedFlightsData = [];

    for (flightData of flights) {
        flattenedFlightsData.push({
            flight: flightData.airline + flightData.flightNumber,
            origin: flightData.departure.airport,
            destination: flightData.arrival.airport,
            departureTime: flightData.departure.scheduled,
        })
    }

    res.send({ flights: flattenedFlightsData });
});

app.listen(port, () => {
    console.log('App started and running on port %s!', port);
});

module.exports = app;