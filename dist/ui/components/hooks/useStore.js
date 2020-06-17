"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const querystring_1 = __importDefault(require("querystring"));
const interval = 5000;
exports.useStore = (basePath) => {
    const [state, setState] = react_1.useState({
        data: null,
        loading: true,
    });
    const [selectedStatuses, setSelectedStatuses] = react_1.useState({});
    const poll = react_1.useRef(undefined);
    const stopPolling = () => {
        if (poll.current) {
            clearTimeout(poll.current);
            poll.current = undefined;
        }
    };
    react_1.useEffect(() => {
        stopPolling();
        runPolling();
        return stopPolling;
    }, [selectedStatuses]);
    const runPolling = () => {
        update()
            // eslint-disable-next-line no-console
            .catch(error => console.error('Failed to poll', error))
            .then(() => {
            const timeoutId = setTimeout(runPolling, interval);
            poll.current = timeoutId;
        });
    };
    const update = () => fetch(`${basePath}/queues/?${querystring_1.default.encode(selectedStatuses)}`)
        .then(res => (res.ok ? res.json() : Promise.reject(res)))
        .then(data => setState({ data, loading: false }));
    const promoteJob = (queueName) => (job) => () => fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/${job.id}/promote`, {
        method: 'put',
    }).then(update);
    const retryJob = (queueName) => (job) => () => fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/${job.id}/retry`, {
        method: 'put',
    }).then(update);
    const retryAll = (queueName) => () => fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/retry`, {
        method: 'put',
    }).then(update);
    const cleanAllDelayed = (queueName) => () => fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/delayed`, {
        method: 'put',
    }).then(update);
    const cleanAllFailed = (queueName) => () => fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/failed`, {
        method: 'put',
    }).then(update);
    const cleanAllCompleted = (queueName) => () => fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/completed`, {
        method: 'put',
    }).then(update);
    return {
        state,
        promoteJob,
        retryJob,
        retryAll,
        cleanAllDelayed,
        cleanAllFailed,
        cleanAllCompleted,
        selectedStatuses,
        setSelectedStatuses,
    };
};
//# sourceMappingURL=useStore.js.map