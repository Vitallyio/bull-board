"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Queue_1 = require("../Queue");
const constants_1 = require("../constants");
exports.escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
// We need to extend so babel doesn't think it's JSX
const keysOf = (target) => Object.keys(target);
exports.QueueList = (props) => {
    var _a;
    const { store } = props;
    const { state } = store;
    const regex = state.search
        ? new RegExp(exports.escapeRegExp(state.search), 'i')
        : undefined;
    return (react_1.default.createElement(react_1.default.Fragment, null, state.loading ? ('Loading...') : (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null,
                react_1.default.createElement("th", null, "name"),
                keysOf(constants_1.STATUSES).map(status => (react_1.default.createElement("th", { key: `${status}` }, status))))),
        react_1.default.createElement("tbody", null, (_a = state.data) === null || _a === void 0 ? void 0 : _a.queueNames.map(name => { var _a; return (_a = state.data) === null || _a === void 0 ? void 0 : _a.queues[name]; }).filter(queue => {
            return regex ? queue.name.match(regex) : true;
        }).filter(queue => {
            const { selectedStatus } = store;
            if (selectedStatus === null || selectedStatus === void 0 ? void 0 : selectedStatus[0]) {
                return queue.name === selectedStatus[0];
            }
            return true;
        }).map(queue => (react_1.default.createElement(Queue_1.Queue, { queue: queue, key: queue.name, selectedStatus: store.selectedStatus, selectStatus: store.setSelectedStatus, promoteJob: store.promoteJob(queue.name), retryJob: store.retryJob(queue.name), retryAll: store.retryAll(queue.name), cleanAllDelayed: store.cleanAllDelayed(queue.name), cleanAllFailed: store.cleanAllFailed(queue.name), cleanAllCompleted: store.cleanAllCompleted(queue.name), cleanAllWaiting: store.cleanAllWaiting(queue.name) }))))))));
};
//# sourceMappingURL=QueueList.js.map