const app = require("./../server/testingServer.js");
const request = require("supertest");
app.listen(4000);

describe("testing server functions with database", () => {
    test("It should return an object", async (done) => {
        const response = await request(app).get("/articles/getFeatured");
        expect(response.body).toBeDefined();
        expect(response.statusCode).toBe(200);
        done();
    });

    // it("signup creates a new user record", function (done) {
    //     var options = {
    //         method: "POST",
    //         uri: "http://localhost:3000/articles/getFeatured",
    //         json: {
    //             username: "Samantha",
    //             password: "Samantha"
    //         }
    //     };

    //     request(options, function (error, res, body) {
    //         var queryString = 'SELECT * FROM users where username = "Samantha"';
    //         db.query(queryString, function (err, rows) {
    //             if (err) {
    //                 done(err);
    //             }
    //             var user = rows[0];
    //             expect(user).to.exist;
    //             expect(user.username).to.equal("Samantha");
    //             done();
    //         });
    //     });
    // });
});

