'use strict';

import {getMetrics} from '../controllers/metrics.server.controller';
import {authenticate} from '../controllers/auth.server.controller';
import {createEvent} from '../controllers/events.server.controller';

module.exports = function (app) {

    app.route('/event/add').post(authenticate, createEvent);

    app.route('/metrics').get(getMetrics);

    // Set params if needed
    // app.param('Id', apiCtrl.func);

};
