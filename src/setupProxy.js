const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(
    "/reviewsApi/*",
    proxy({
      target: "http://localhost:3004",
      changeOrigin: true
    })
  );
};
