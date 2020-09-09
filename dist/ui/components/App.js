"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Header_1 = require("./Header");
const useStore_1 = require("./hooks/useStore");
const QueueList_1 = require("./routes/QueueList");
const JobList_1 = require("./routes/JobList");
exports.App = ({ basePath }) => {
    return (react_1.default.createElement(react_router_dom_1.BrowserRouter, { basename: basePath },
        react_1.default.createElement(react_router_dom_1.Switch, null,
            react_1.default.createElement(react_router_dom_1.Route, { path: "/:queue/:status", render: () => react_1.default.createElement(exports.AppInner, { basePath: basePath }) }),
            react_1.default.createElement(react_router_dom_1.Route, { path: "/", render: () => react_1.default.createElement(exports.AppInner, { basePath: basePath }) }))));
};
exports.AppInner = ({ basePath }) => {
    const store = useStore_1.useStore(basePath);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { store: store }),
        react_1.default.createElement(QueueList_1.QueueList, { store: store }),
        store.selectedStatus && react_1.default.createElement(JobList_1.JobList, { store: store })));
};
//# sourceMappingURL=App.js.map