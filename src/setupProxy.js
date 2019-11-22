const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    ["/articles/*", "/users/login", "/users/signup","/users/user"],
    proxy({
      target: "http://localhost:3004",
      changeOrigin: true
    })
  );
};
