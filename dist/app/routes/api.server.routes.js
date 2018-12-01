'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const auth_server_controller_1 = require("../controllers/auth.server.controller");
const events_server_controller_1 = require("../controllers/events.server.controller");
const metrics_server_controller_1 = require("../controllers/metrics.server.controller");
module.exports = function (app) {
    app.route('/event/add').post(auth_server_controller_1.authenticate, events_server_controller_1.createEvent);
    app.route('/event/:eventID/view').post(auth_server_controller_1.authenticate, events_server_controller_1.displayEvent);
    app.route('/events/list').post(auth_server_controller_1.authenticate, events_server_controller_1.listEvents);
    app.route('/metrics').get(metrics_server_controller_1.getMetrics);
};
//# sourceMappingURL=api.server.routes.js.map