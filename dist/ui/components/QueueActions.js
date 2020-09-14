"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ACTIONABLE_STATUSES = [
    'failed',
    'delayed',
    'completed',
    'waiting',
];
const isStatusActionable = (status) => ACTIONABLE_STATUSES.includes(status);
exports.QueueActions = ({ status, retryAll, cleanAllFailed, cleanAllDelayed, cleanAllCompleted, cleanAllWaiting, }) => {
    if (!isStatusActionable(status)) {
        return react_1.default.createElement("div", null);
    }
    return (react_1.default.createElement("div", null,
        status === 'failed' && (react_1.default.createElement("div", null,
            react_1.default.createElement("button", { style: { margin: 10 }, onClick: retryAll }, "Retry all"),
            react_1.default.createElement("button", { style: { margin: 10 }, onClick: cleanAllFailed }, "Clean all"))),
        status === 'delayed' && (react_1.default.createElement("button", { style: { margin: 10 }, onClick: cleanAllDelayed }, "Clean all")),
        status === 'completed' && (react_1.default.createElement("button", { style: { margin: 10 }, onClick: cleanAllCompleted }, "Clean all")),
        status === 'waiting' && (react_1.default.createElement("button", { style: { margin: 10 }, onClick: cleanAllWaiting }, "Clean all"))));
};
//# sourceMappingURL=QueueActions.js.map