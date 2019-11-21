const proxy = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        ["/articles/", "/user/login"],
        proxy({
            target: "http://localhost:3004",
            changeOrigin: true
        })
    );

};