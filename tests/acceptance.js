var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var fs = require('fs');
var should = chai.should();
var assert = chai.assert;

chai.use(chaiHttp);

var exampleRequest = JSON.parse(fs.readFileSync('./tests/example-request.json', 'utf8'));
var exampleResponse = JSON.parse(fs.readFileSync('./tests/example-response.json', 'utf8'));

describe('/POST flights', () => {
    it('should return an error message when the json is invalid', (done) => {
        chai.request(server)
            .post('/flights')
            .send('{brokenjson')
            .type('json')
            .end((err, res) => {
                res.should.have.status(400);
                assert.equal(res.text, '{"error":"error parsing JSON"}');
                done();
            });
    });
    it('example data sets should match', (done) => {
        chai.request(server)
            .post('/flights')
            .send(exampleRequest)
            .type('json')
            .end((err, res) => {
                res.should.have.status(200);
                assert.equal(JSON.stringify(exampleResponse), JSON.stringify(res.body), 'Examples do not match');
                done();
            });
    });
    it('missing data in the requested payload should be silently ignored', (done) => {
        chai.request(server)
            .post('/flights')
            .send({
                "flights": [
                    {
                        "airline": "QF"
                    },
                    {
                        "airline": "QF",
                        "arrival": {"airport": "SYD"},
                        "departure": {"airport": "PAR"},
                    }
                ]
            })
            .type('json')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.flights.should.have.lengthOf(1); 
                done();
            });
    });
});