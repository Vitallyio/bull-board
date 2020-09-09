"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Jobs_1 = require("../Jobs");
const QueueActions_1 = require("../QueueActions");
exports.JobList = (props) => {
    var _a;
    const { store } = props;
    if (!store.state.data) {
        return null;
    }
    if (!store.selectedStatus) {
        return null;
    }
    const [name, status] = store.selectedStatus;
    if (!name) {
        return null;
    }
    const queue = (_a = store.state.data) === null || _a === void 0 ? void 0 : _a.queues[name];
    if (!queue) {
        throw new Error(`Couldn't find queue in store: ${name}`);
    }
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(QueueActions_1.QueueActions, { retryAll: store.retryAll(queue.name), cleanAllDelayed: store.cleanAllDelayed(queue.name), cleanAllFailed: store.cleanAllFailed(queue.name), cleanAllCompleted: store.cleanAllCompleted(queue.name), cleanAllWaiting: store.cleanAllWaiting(queue.name), queue: queue, status: status !== null && status !== void 0 ? status : 'latest' }),
        react_1.default.createElement(Jobs_1.Jobs, { retryJob: store.retryJob(name), promoteJob: store.promoteJob(name), queue: queue, status: status })));
};
//# sourceMappingURL=JobList.js.map