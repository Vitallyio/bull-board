"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const constants_1 = require("./constants");
const react_router_dom_1 = require("react-router-dom");
const MenuItem = ({ status, count, name, selected }) => (react_1.default.createElement(react_router_dom_1.Link, { className: `menu-item ${status} ${selected ? 'selected' : ''} ${count === 0 ? 'off' : 'on'}`, to: {
        pathname: `/${encodeURIComponent(name)}/${status}`,
    } }, status !== 'latest' && react_1.default.createElement("b", { className: "count" }, count)));
// We need to extend so babel doesn't think it's JSX
const keysOf = (target) => Object.keys(target);
exports.Queue = ({ queue, selectedStatus, selectStatus }) => {
    const currentJobSelected = selectedStatus != null && selectedStatus[0] === queue.name;
    return (react_1.default.createElement("tr", null,
        react_1.default.createElement("td", null, queue.name),
        keysOf(constants_1.STATUSES).map(status => (react_1.default.createElement("td", { key: `${queue.name}-${status}` },
            react_1.default.createElement(MenuItem, { name: queue.name, status: status, count: queue.counts[status], onClick: () => {
                    // Clear status if currently expanded
                    if (selectedStatus &&
                        queue.name === selectedStatus[0] &&
                        status === selectedStatus[1]) {
                        selectStatus(undefined);
                    }
                    else {
                        selectStatus([queue.name, status]);
                    }
                }, selected: currentJobSelected &&
                    selectedStatus != null &&
                    selectedStatus[1] === status }))))));
};
//# sourceMappingURL=Queue.js.map