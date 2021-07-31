const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("https");
const fs = require('fs');
const frameguard = require('frameguard')
app.use(frameguard({ action: 'SAMEORIGIN' }))
const normalizePort = val => {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};
const onListening = () => {
    const addr = server.address();
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    debug("Listening on " + bind);
}
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);
const server = http.createServer({
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
}, app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);