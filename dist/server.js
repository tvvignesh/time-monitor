if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}
const MongoClient = require('mongodb').MongoClient;
let config = require('./config/config');
const url = 'mongodb://localhost:27017';
const dbName = 'time-monitor';
MongoClient.connect(url, function (err, client) {
    if (err) {
        console.log(err);
    }
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    let app = require('./config/express')(db);
    process.on('uncaughtException', function (err) {
        console.log('Error:', err);
    });
    app.get('server').listen(config.port, config.hostname);
    exports = module.exports = app;
    console.log(`${config.app.title} started on ${config.hostname} : ${config.port} in ${process.env.NODE_ENV} mode on ${new Date().toISOString()}`);
});
//# sourceMappingURL=server.js.map