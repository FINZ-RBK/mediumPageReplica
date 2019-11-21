var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");

const port = process.env.PORT || 3004;

var httpMocks = require("node-mocks-http");

var app = require("../server/app.js");
var schema = require("../server/db/config.js");
var port = 3000;
describe("testing server functions with database", () => {
    var app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    it("signup creates a new user record", function (done) {
        var options = {
            method: "POST",
            uri: "http://localhost:3000/articles/getFeatured",
            json: {
                username: "Samantha",
                password: "Samantha"
            }
        };

        request(options, function (error, res, body) {
            var queryString = 'SELECT * FROM users where username = "Samantha"';
            db.query(queryString, function (err, rows) {
                if (err) {
                    done(err);
                }
                var user = rows[0];
                expect(user).to.exist;
                expect(user.username).to.equal("Samantha");
                done();
            });
        });
    });
});

