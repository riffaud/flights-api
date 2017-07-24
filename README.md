# Flights API [![build status](https://travis-ci.org/riffaudo/flights-api.svg?branch=master)](https://travis-ci.org/riffaudo/flights-api)
Node.js API that accepts JSON posted to /flights , filters that data, and returns a few fields for each flight.

## Prerequisites

The package depends on [Node.js](https://nodejs.org/en/download/).

## Installation

To install, run in a terminal:

    npm install

And then to start the API:

    npm start

You can now send POST requests to http://localhost:8080/flights

## Running the tests

This software depends on [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com) for running tests.

    npm test
    
## Built with

* [Node.js](https://nodejs.org/en/download/)
* [Express 4](http://expressjs.com)
* [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com) for running tests
