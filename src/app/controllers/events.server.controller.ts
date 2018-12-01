import {findEvents, pushEvent} from "../utils/event.utils";

/**
 * CREATE AN EVENT
 * @param req Request
 * @param res Response
 */
export const createEvent = function (req, res) {

    let reqBody = req.body;

    console.log('reqBody:', reqBody);

    reqBody.eventTags = reqBody.eventTags.split(',');

    let eventObj = {
        metaData: reqBody
    };

    pushEvent(eventObj, function (event) {
        console.log('event:', event);

        return res.status(200).jsonp({
            message: 'Event created successfully!'
        });
    });
};

/**
 * GET AN EVENT INFORMATION
 * @param req Request
 * @param res Response
 */
export const getEvent = function (req, res) {

    findEvents({

    }, function (events) {
        console.log('events::', events);

        return res.status(200).jsonp({
            message: 'Event displayed successfully!'
        });
    });
};

/**
 * DELETE AN EVENT
 * @param req Request
 * @param res Response
 */
export const deleteEvent = function (req, res) {
    return res.status(200).jsonp({
        message: 'Event deleted successfully!'
    });
};

/**
 * DELETE AN EVENT
 * @param req Request
 * @param res Response
 */
export const listEvents = function (req, res) {

    let reqBody = req.body;

    findEvents(reqBody, function (events) {
        console.log('events::', events);

        return res.status(200).jsonp({events: events});
    });
};