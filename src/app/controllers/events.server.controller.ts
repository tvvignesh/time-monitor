/**
 * CREATE AN EVENT
 * @param req Request
 * @param res Response
 */
export const createEvent = function (req, res) {
    return res.status(200).jsonp({
        message: 'Event created successfully!'
    });
};