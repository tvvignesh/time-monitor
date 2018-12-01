"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_utils_1 = require("../utils/event.utils");
exports.createEvent = function (req, res) {
    let reqBody = req.body;
    console.log('reqBody:', reqBody);
    let eventObj = {
        metaData: reqBody
    };
    event_utils_1.pushEvent(eventObj, function (event) {
        console.log('event:', event);
        return res.status(200).jsonp({
            message: 'Event created successfully!'
        });
    });
};
exports.displayEvent = function (req, res) {
    event_utils_1.findEvents({}, function (events) {
        console.log('events::', events);
        return res.status(200).jsonp({
            message: 'Event displayed successfully!'
        });
    });
};
exports.deleteEvent = function (req, res) {
    return res.status(200).jsonp({
        message: 'Event deleted successfully!'
    });
};
exports.listEvents = function (req, res) {
    event_utils_1.findEvents({}, function (events) {
        console.log('events::', events);
        return res.status(200).jsonp(events);
    });
};
//# sourceMappingURL=events.server.controller.js.map