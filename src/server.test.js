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

// testing for signin

describe("checking login", () => {
  test("It should return an object", async done => {
    const response = await request(app)
      .post(`/users/login`)
      .send({ email: "fatoomfayyad@gmail.com", password: "123456" });
      // expect(response.statusCode).toBe(200);
      expect(response.status).toEqual(200)
      expect(JSON.parse(response.text).name).toEqual("fatoom")

    done();
  });
    test("It should return an error", async done => {
      const response = await request(app)
      .post('/users/login')
      .send({email: "fatoomfayyad@gmail.com", password: '123'});
      expect(response.statusCode).toBe(203);
      expect(JSON.parse(response.text).errors[0].param).toBe("password");

      done();
    });
    test("It should return an error", async done => {
      const response = await request(app)
      .post('/users/login')
      .send({email: "fatoddddyad@gmail.com", password: '123548484'});
      expect(response.statusCode).toBe(201);
      done();
    });
  });


  //checking singup 


describe("checking signup", () => {
  test("It should return an error with exisit", async done => {
    const response = await request(app)
      .post(`/users/signup`)
      .send({ email: "fatoomfayyad@gmail.com", password: "123456" });
      expect(response.statusCode).toBe(201);
    done();
  });
    test("It should return an object", async done => {
      const response = await request(app)
      .post('/users/signup')
      .send({name :"FA",email: "fatoomfayyad12@gmail.com", password: '123ss4567'});
      expect(response.status).not.toEqual(200);
      done();
    });
    
  });

  // checking get user

describe("checking get user", () => {
  test("It should return an error ", async done => {
    const response = await request(app)
      .get(`/users/user`)
      .set({"x-access-token": "anything" });
      expect(response.status).toBe(401);
    done();
  });   
  });

  // test("it shoud return tree row for an exist id", async done => {
  //   const response = await request(app).get(`/articles/get10Articals`);
  //   expect(response.body.data.length).toEqual(3);
  //   done();
  // });
  // test("it shoude return null for no id", async done => {
  //   const response = await request(app).get(`/articles/getCategory/`);
  //   expect(null).toBeDefined();
  //   expect(response.type).toBe("application/json");
  //   done();
  // });
// });

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
