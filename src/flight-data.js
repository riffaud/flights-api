// return true if flight data is for a qantas airline, going or arriving to Sydney
function filterQantasSydneyFlights(flight) {
    return flight.airline === 'QF' &&
        flight.departure !== undefined && flight.arrival !== undefined &&
        (flight.departure.airport === 'SYD' || flight.arrival.airport === 'SYD');
}

// maps flight data into a flatten format
function flattenFlightData(flights) {
    var flattenedFlightsData = [];

    for (flightData of flights) {
        flattenedFlightsData.push({
            flight: flightData.airline + flightData.flightNumber,
            origin: flightData.departure.airport,
            destination: flightData.arrival.airport,
            departureTime: flightData.departure.scheduled,
        });
    }

    return flattenedFlightsData;
}

module.exports = {
    filterQantasSydneyFlights: filterQantasSydneyFlights,
    flattenFlightData: flattenFlightData,
};