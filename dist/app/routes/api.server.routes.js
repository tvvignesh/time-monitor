'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const metrics_server_controller_1 = require("../controllers/metrics.server.controller");
const auth_server_controller_1 = require("../controllers/auth.server.controller");
const events_server_controller_1 = require("../controllers/events.server.controller");
module.exports = function (app) {
    app.route('/event/add').post(auth_server_controller_1.authenticate, events_server_controller_1.createEvent);
    app.route('/metrics').get(metrics_server_controller_1.getMetrics);
};
//# sourceMappingURL=api.server.routes.js.map