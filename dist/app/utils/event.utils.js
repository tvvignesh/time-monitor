"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvent = function (eventObj, callback) {
    const collection = global["db"].collection('events');
    collection.find(eventObj).toArray(function (err, docs) {
        if (err) {
            console.log('error:', err);
        }
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
exports.findEvents = function (eventObj, callback) {
    const collection = global["db"].collection('events');
    collection.find(eventObj).toArray(function (err, docs) {
        if (err) {
            console.log('error:', err);
        }
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};
exports.pushEvent = function (eventObj, callback) {
    const collection = global["db"].collection('events');
    collection.insertMany([
        {
            title: eventObj.title,
            tags: eventObj.eventTags,
            uid: "1234",
            time: Date.now(),
            location: "gps-coord",
            duration: "1 hour",
            metadata: eventObj.metaData
        }
    ], function (err, result) {
        if (err) {
            console.log('error:', err);
        }
        console.log("Created Event successfully!");
        callback(result);
    });
};
//# sourceMappingURL=event.utils.js.map