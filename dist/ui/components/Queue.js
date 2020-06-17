"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const constants_1 = require("./constants");
const Jobs_1 = require("./Jobs");
const MenuItem = ({ status, count, onClick, selected }) => (react_1.default.createElement("div", { className: `menu-item ${status} ${selected ? 'selected' : ''} ${count === 0 ? 'off' : 'on'}`, onClick: onClick },
    status !== 'latest' && react_1.default.createElement("b", { className: "count" }, count),
    " ",
    status));
const ACTIONABLE_STATUSES = ['failed', 'delayed', 'completed'];
const isStatusActionable = (status) => ACTIONABLE_STATUSES.includes(status);
const QueueActions = ({ status, retryAll, cleanAllFailed, cleanAllDelayed, cleanAllCompleted, }) => {
    if (!isStatusActionable(status)) {
        return react_1.default.createElement("div", null);
    }
    return (react_1.default.createElement("div", null,
        status === 'failed' && (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { style: { margin: 10 }, onClick: retryAll }, "Retry all"),
            react_1.default.createElement("button", { style: { margin: 10 }, onClick: cleanAllFailed }, "Clean all"))),
        status === 'delayed' && (react_1.default.createElement("button", { style: { margin: 10 }, onClick: cleanAllDelayed }, "Clean all")),
        status === 'completed' && (react_1.default.createElement("button", { style: { margin: 10 }, onClick: cleanAllCompleted }, "Clean all"))));
};
// We need to extend so babel doesn't think it's JSX
const keysOf = (target) => Object.keys(target);
exports.Queue = ({ cleanAllDelayed, cleanAllFailed, cleanAllCompleted, queue, retryAll, retryJob, promoteJob, selectedStatus, selectStatus, }) => (react_1.default.createElement("section", null,
    react_1.default.createElement("h3", null, queue.name),
    react_1.default.createElement("div", { className: "menu-list" }, keysOf(constants_1.STATUSES).map(status => (react_1.default.createElement(MenuItem, { key: `${queue.name}-${status}`, status: status, count: queue.counts[status], onClick: () => selectStatus({ [queue.name]: status }), selected: selectedStatus === status })))),
    selectedStatus && (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(QueueActions, { retryAll: retryAll, cleanAllDelayed: cleanAllDelayed, cleanAllFailed: cleanAllFailed, cleanAllCompleted: cleanAllCompleted, queue: queue, status: selectedStatus }),
        react_1.default.createElement(Jobs_1.Jobs, { retryJob: retryJob, promoteJob: promoteJob, queue: queue, status: selectedStatus })))));
//# sourceMappingURL=Queue.js.map