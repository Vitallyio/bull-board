"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
exports.cleanAll = async (req, res) => {
    try {
        const { queueName, queueStatus } = req.params;
        const { bullBoardQueues, } = req.app.locals;
        const GRACE_TIME_MS = 5000;
        const LIMIT = 1000;
        const { queue } = bullBoardQueues[queueName];
        if (!queue) {
            return res.status(404).send({
                error: 'Queue not found',
            });
        }
        if (queue instanceof bullmq_1.Queue) {
            await queue.clean(GRACE_TIME_MS, LIMIT, queueStatus);
        }
        else {
            await queue.clean(GRACE_TIME_MS, queueStatus);
        }
        return res.sendStatus(200);
    }
    catch (e) {
        const body = {
            error: 'queue error',
            details: e.stack,
        };
        return res.status(500).send(body);
    }
};
//# sourceMappingURL=cleanAll.js.map