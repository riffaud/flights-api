# Flights API [![build status](https://travis-ci.org/riffaudo/flights-api.svg?branch=master)](https://travis-ci.org/riffaudo/flights-api)

Node.js API that accepts JSON posted to /flights , filters that data, and returns a few fields for each flight. It is publicaly accessible at https://my-flight-api-project.herokuapp.com/flights. Any push to master will trigger a travis CI test build, and deploy to that domain.

## Prerequisites

The package depends on [Node.js](https://nodejs.org/en/download/).

## Installation

To install, run in a terminal:

    npm install

And then to start the API:

    npm start

You can now send POST requests to the only available endpoint http://localhost:8080/flights. The body should have the following format:

```
{
  "flights": [
    {
      "flightNumber": "801",
      "arrival": {
        "onblocks": {
          "time": "2017-06-21T01:00:00Z",
          "type": "scheduled"
        },
        "airport": "PER",
        "scheduled": "2017-06-21T01:00:00Z"
      },
      "departure": {
        "offblocks": {
          "time": "2017-06-20T21:00:00Z",
          "type": "scheduled"
        },
        "airport": "DRW",
        "scheduled": "2017-06-20T21:00:00Z"
      },
      "originDateLocal": "2017-06-21",
      "lastChanged": "2017-06-20T06:20:57Z",
      "flightSlug": "QF801",
      "originDate": "2017-06-20",
      "airline": "QF"
    }
  ]
}
```

## Running the tests

This software depends on [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com) for running tests.

    npm test
    
## Built with

* [Node.js](https://nodejs.org/en/download/)
* [Express 4](http://expressjs.com)
* [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com) for running tests
