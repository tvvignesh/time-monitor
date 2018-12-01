if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'production';
}

const MongoClient = require('mongodb').MongoClient;

let config = require('./config/config');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'time-monitor';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {

    if (err) {
        console.log(err);
    }

    console.log("Connected successfully to server");

    const db = client.db(dbName);

    // Init the express application
    let app = require('./config/express')(db);

    process.on('uncaughtException', function (err) {
        console.log('Error:', err);
    });

    // Start the app by listening on <port>
    app.get('server').listen(config.port, config.hostname);

    // Expose app
    exports = module.exports = app;

    // Logging initialization
    console.log(`${config.app.title} started on ${config.hostname} : ${config.port} in ${process.env.NODE_ENV} mode on ${new Date().toISOString()}`);
    // client.close();
});