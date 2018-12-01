"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event_utils_1 = require("../utils/event.utils");
exports.createEvent = function (req, res) {
    let reqBody = req.body;
    console.log('reqBody:', reqBody);
    reqBody.eventTags = reqBody.eventTags.split(',');
    let eventObj = {
        metaData: reqBody
    };
    if (reqBody.eventStartTime) {
        eventObj.metaData["eventStartTime"] = new Date(reqBody.eventStartTime);
    }
    else {
        eventObj.metaData["eventStartTime"] = Date.now();
    }
    if (reqBody.eventEndTime) {
        eventObj.metaData["eventEndTime"] = new Date(reqBody.eventEndTime);
    }
    else {
        eventObj.metaData["eventEndTime"] = Date.now();
    }
    event_utils_1.pushEvent(eventObj, function () {
        console.log('event:', eventObj);
        event_utils_1.addEventToGoogle(eventObj, function () {
            return res.status(200).jsonp({
                message: 'Event created successfully!'
            });
        });
    });
};
exports.getEvent = function (req, res) {
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
    let reqBody = req.body;
    event_utils_1.findEvents(reqBody, function (events) {
        console.log('events::', events);
        return res.status(200).jsonp({ events: events });
    });
};
//# sourceMappingURL=events.server.controller.js.map