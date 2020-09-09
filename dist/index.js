"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const bullmq_1 = require("bullmq");
const queues_1 = require("./routes/queues");
const retryAll_1 = require("./routes/retryAll");
const retryJob_1 = require("./routes/retryJob");
const promoteJob_1 = require("./routes/promoteJob");
const cleanAll_1 = require("./routes/cleanAll");
const index_1 = require("./routes/index");
const bullBoardQueues = {};
const wrapAsync = (fn) => async (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const router = express_1.default();
exports.router = router;
router.locals.bullBoardQueues = bullBoardQueues;
router.set('view engine', 'ejs');
router.set('views', path_1.default.resolve(__dirname, '../dist/ui'));
router.use('/static', express_1.default.static(path_1.default.resolve(__dirname, '../static')));
router.get('/queues', wrapAsync(queues_1.queuesHandler));
router.put('/queues/:queueName/retry', wrapAsync(retryAll_1.retryAll));
router.put('/queues/:queueName/:id/retry', wrapAsync(retryJob_1.retryJob));
router.put('/queues/:queueName/:id/promote', wrapAsync(promoteJob_1.promoteJob));
router.put('/queues/:queueName/clean/:queueStatus', wrapAsync(cleanAll_1.cleanAll));
router.get('*', index_1.entryPoint);
exports.setQueues = (bullQueues) => {
    bullQueues.forEach((queue) => {
        const name = queue instanceof bullmq_1.Queue ? queue.toKey('~') : queue.name;
        bullBoardQueues[name] = {
            queue,
        };
    });
};
exports.replaceQueues = (bullQueues) => {
    const queuesToPersist = bullQueues.map(queue => queue.name);
    Object.keys(bullBoardQueues).forEach(name => {
        if (queuesToPersist.indexOf(name) === -1) {
            delete bullBoardQueues[name];
        }
    });
    return exports.setQueues(bullQueues);
};
//# sourceMappingURL=index.js.map