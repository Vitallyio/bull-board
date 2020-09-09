"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const querystring_1 = __importDefault(require("querystring"));
const react_router_dom_1 = require("react-router-dom");
const useInterval_1 = require("./useInterval");
const interval = 2500;
exports.useStore = (basePath) => {
    var _a;
    const params = react_router_dom_1.useParams();
    const [state, setState] = react_1.useState({
        data: null,
        loading: true,
        search: params.search,
    });
    const [selectedStatus, setSelectedStatus] = react_1.useState([
        params.queue,
        (_a = params.status) !== null && _a !== void 0 ? _a : 'latest',
    ]);
    // route params change -> update state
    react_1.useEffect(() => {
        if (params.queue && params.status) {
            setSelectedStatus([decodeURIComponent(params.queue), params.status]);
        }
        else {
            setSelectedStatus(undefined);
        }
    }, [params]);
    // selected status changed -> immediate refresh
    react_1.useEffect(() => {
        update().catch(console.error);
    }, [selectedStatus]);
    useInterval_1.useInterval(() => update().catch(console.error), interval);
    const update = () => {
        const urlParam = selectedStatus != null
            ? querystring_1.default.encode({ [selectedStatus[0]]: selectedStatus[1] })
            : '';
        return fetch(`${basePath}/queues/?${urlParam}`)
            .then(res => (res.ok ? res.json() : Promise.reject(res)))
            .then(data => setState(state => {
            return { ...state, data, loading: false };
        }));
    };
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
    const cleanAllWaiting = (queueName) => () => fetch(`${basePath}/queues/${encodeURIComponent(queueName)}/clean/wait`, {
        method: 'put',
    }).then(update);
    const setSearch = (search) => setState({ data: state.data, loading: state.loading, search: search });
    return {
        state,
        params,
        setSearch,
        promoteJob,
        retryJob,
        retryAll,
        cleanAllDelayed,
        cleanAllFailed,
        cleanAllCompleted,
        cleanAllWaiting,
        selectedStatus,
        setSelectedStatus,
    };
};
//# sourceMappingURL=useStore.js.map