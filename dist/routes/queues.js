"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_info_1 = require("redis-info");
const metrics = [
    'redis_version',
    'used_memory',
    'mem_fragmentation_ratio',
    'connected_clients',
    'blocked_clients',
];
const getStats = async ({ queue, }) => {
    const redisClient = await queue.client;
    const redisInfoRaw = await redisClient.info();
    const redisInfo = redis_info_1.parse(redisInfoRaw);
    const validMetrics = metrics.reduce((acc, metric) => {
        if (redisInfo[metric]) {
            acc[metric] = redisInfo[metric];
        }
        return acc;
    }, {});
    // eslint-disable-next-line @typescript-eslint/camelcase
    validMetrics.total_system_memory =
        redisInfo.total_system_memory || redisInfo.maxmemory;
    return validMetrics;
};
const formatJob = (job) => {
    const jobProps = job.toJSON();
    return {
        id: jobProps.id,
        timestamp: jobProps.timestamp,
        processedOn: jobProps.processedOn,
        finishedOn: jobProps.finishedOn,
        progress: jobProps.progress,
        attempts: jobProps.attemptsMade,
        delay: job.opts.delay,
        failedReason: jobProps.failedReason,
        stacktrace: jobProps.stacktrace,
        opts: jobProps.opts,
        data: jobProps.data,
        name: jobProps.name,
    };
};
const statuses = [
    'active',
    'completed',
    'delayed',
    'failed',
    'paused',
    'waiting',
];
const getDataForQueues = async (bullBoardQueues, req) => {
    var _a;
    const query = req.query || {};
    const pairs = Object.entries(bullBoardQueues);
    if (pairs.length == 0) {
        return {
            stats: {},
            queueNames: [],
            queues: {},
        };
    }
    const page = (_a = query.page) !== null && _a !== void 0 ? _a : 0;
    const queues = {};
    await Promise.all(pairs.map(async ([name, { queue }]) => {
        const counts = await queue.getJobCounts(...statuses);
        const status = query[name] === 'latest' ? statuses : query[name];
        const jobs = {
            latest: [],
            active: [],
            waiting: [],
            completed: [],
            failed: [],
            delayed: [],
            paused: [],
        };
        if (typeof status === 'string') {
            const statusJobs = await queue.getJobs(status /* bad type? */, page * 10, (page + 1) * 10);
            jobs[status] = statusJobs.map(formatJob);
        }
        else if (query[name] && status.length > 0) {
            const statusJobs = await queue.getJobs(status /* bad type? */, page * 10, (page + 1) * 10);
            jobs[query[name]] = statusJobs.map(formatJob);
        }
        queues[name] = {
            name,
            counts: counts,
            jobs,
        };
    }));
    const stats = await getStats(pairs[0][1]);
    return {
        stats,
        queues,
        queueNames: pairs.map(([name]) => name),
    };
};
exports.queuesHandler = async (req, res) => {
    const { bullBoardQueues } = req.app.locals;
    res.json(await getDataForQueues(bullBoardQueues, req));
};
//# sourceMappingURL=queues.js.map