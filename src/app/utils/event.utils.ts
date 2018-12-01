/**
 * Get an event specific information
 * @param eventObj
 * @param callback
 */
export const getEvent = function (eventObj, callback) {
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

/**
 * List events matching the criteria
 * @param eventObj
 * @param callback
 */
export const findEvents = function (eventObj, callback) {

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

/**
 * Push event to the user's event queue
 * @param eventObj
 * @param callback
 */
export const pushEvent = function (eventObj, callback) {

    const collection = global["db"].collection('events');

    collection.insertMany([
        {
            title: "running",
            tags: ["physical", "excercise", "sports"],
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