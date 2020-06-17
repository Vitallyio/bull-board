"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dockest_1 = require("dockest");
const { run } = new dockest_1.Dockest({
    dumpErrors: true,
    jestLib: require('jest'),
    logLevel: dockest_1.logLevel.DEBUG,
});
run([
    {
        serviceName: 'redis',
        healthcheck: async ({ defaultHealthchecks: { redis } }) => {
            await redis();
        },
    },
]);
//# sourceMappingURL=dockest.js.map