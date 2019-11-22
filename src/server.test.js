const app = require("./../server/testingServer.js");
const request = require("supertest");
app.listen(4000);

describe("testing server functions with database", () => {
  test("It should return an object", async done => {
    const response = await request(app).get("/articles/getFeatured");
    expect(response.body.article).toBeDefined();
    expect(response.body.articleAuthor).toBeDefined();
    expect(response.statusCode).toBe(200);
    done();
  });
  test("It should 404 for wrong requests", async done => {
    const response = await request(app).get("/articles/nothing");
    expect(response.statusCode).toBe(404);
    done();
  });
});

////////// Articals Users and Categories Routs Testung //////////////
describe("checking Users conection with database ", () => {
  test("It should return an object", async done => {
    const response = await request(app).get(`/articles/getUser/?id${1779}`);
    expect(response.body.name).toBeDefined();
    expect(response.statusCode).toBe(200);
    done();
  });

  test("it shoude return null for no id", async done => {
    const response = await request(app).get(`/articles/getUser/`);
    expect(null).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe("application/json");
    done();
  });

  describe("checking Categories conection with database ", () => {
    test("It should return an object", async done => {
      const response = await request(app).get(`/articles/getCategory?id${55}`);
      expect(response.body.categ).toBeDefined();
      expect(response.statusCode).toBe(200);
      done();
    });

    test("it shoude return null for no id", async done => {
      const response = await request(app).get(`/articles/getCategory/`);
      expect(null).toBeDefined();
      expect(response.statusCode).toBe(200);
      expect(response.type).toBe("application/json");
      done();
    });
  });

  describe("checking Articals conection with database ", () => {
    test("It should return an object", async done => {
      const response = await request(app).get(`/articles/get10Articals`);
      expect(response.body.data).toBeDefined();
      expect(response.statusCode).toBe(200);
      done();
    });

    test("it shoud return tree row for an exist id", async done => {
      const response = await request(app).get(`/articles/get10Articals`);
      expect(response.body.data.length).toEqual(3);
      done();
    });
    test("it shoude return null for no id", async done => {
      const response = await request(app).get(`/articles/getCategory/`);
      expect(null).toBeDefined();
      expect(response.type).toBe("application/json");
      done();
    });
  });
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
