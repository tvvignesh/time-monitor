'use strict';

import {authenticate} from '../controllers/auth.server.controller';
import {createEvent, getEvent, listEvents} from '../controllers/events.server.controller';
import {getMetrics} from '../controllers/metrics.server.controller';

module.exports = function (app) {

    app.route('/event/add').post(authenticate, createEvent);

    app.route('/event/:eventID/view').post(authenticate, getEvent);

    app.route('/events/list').post(authenticate, listEvents);

    app.route('/metrics').get(getMetrics);

    // Set params if needed
    // app.param('Id', apiCtrl.func);

};
