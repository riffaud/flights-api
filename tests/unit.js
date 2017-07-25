var assert = require('chai').assert;
var { filterQantasSydneyFlights, flattenFlightData } = require('../src/flight-data');

describe('filterQantasSydneyFlights', function () {
    it('should return valid qantas and sydney data', function () {
        var response = [
            {
                arrival: {
                    airport: "SYD"
                },
                departure: {
                    airport: "DRW"
                },
                airline: "QF"
            },
            {
                arrival: {
                    airport: "PAR"
                },
                departure: {
                    airport: "DRW"
                },
                airline: "QF"
            },
            {
                arrival: {
                    airport: "SYD"
                },
                departure: {
                    airport: "DRW"
                },
                airline: "AS"
            },
            {
                airline: "QF"
            }
        ].filter(filterQantasSydneyFlights);
        assert.lengthOf(response, 1);
        assert.equal(JSON.stringify([
            {
                arrival: {
                    airport: "SYD"
                },
                departure: {
                    airport: "DRW"
                },
                airline: "QF"
            }
        ]), JSON.stringify(response));
    });
});
describe('flattenFlightData', function () {
    it('should return flattened data', function () {
        var flights = [{
            "flightNumber": "801",
            "arrival": {
                "airport": "PER",
                "scheduled": "2017-06-21T01:00:00Z"
            },
            "departure": {
                "airport": "DRW",
                "scheduled": "2017-06-20T21:00:00Z"
            },
            "originDateLocal": "2017-06-21",
            "lastChanged": "2017-06-20T06:20:57Z",
            "originDate": "2017-06-20",
            "airline": "QF"
        },
        {
            "flightNumber": "792",
            "arrival": {
                "airport": "DRW"
            },
            "departure": {
                "airport": "SYD"
            },
            "airline": "QF"
        }];
        var response = flattenFlightData(flights);
        assert.equal(JSON.stringify(response), JSON.stringify([
            {
                flight: "QF801",
                origin: "DRW",
                destination: "PER",
                departureTime: "2017-06-20T21:00:00Z",
            }, {
                flight: "QF792",
                origin: "SYD",
                destination: "DRW",
                departureTime: undefined,
            }]));

    });
});