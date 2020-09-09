"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Queue_1 = require("./Queue");
const RedisStats_1 = require("./RedisStats");
const Header_1 = require("./Header");
const useStore_1 = require("./hooks/useStore");
const useSearch_1 = require("./hooks/useSearch");
exports.escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};
exports.App = ({ basePath }) => {
    var _a, _b;
    const { state, selectedStatus, setSearch, setSelectedStatus, promoteJob, retryJob, retryAll, cleanAllDelayed, cleanAllFailed, cleanAllCompleted, cleanAllWaiting, } = useStore_1.useStore(basePath);
    useSearch_1.useSearch({
        search: state.search,
        status: selectedStatus ? selectedStatus[1] : undefined,
        job: selectedStatus ? selectedStatus[0] : undefined,
    });
    const regex = state.search
        ? new RegExp(exports.escapeRegExp(state.search), 'i')
        : undefined;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header_1.Header, { search: react_1.default.createElement("input", { value: state.search, onChange: evt => setSearch(evt.target.value) }) }),
        react_1.default.createElement("main", null, state.loading ? ('Loading...') : (react_1.default.createElement(react_1.default.Fragment, null,
            ((_a = state.data) === null || _a === void 0 ? void 0 : _a.stats) ? (react_1.default.createElement(RedisStats_1.RedisStats, { stats: state.data.stats })) : (react_1.default.createElement(react_1.default.Fragment, null, "No stats to display ")), (_b = state.data) === null || _b === void 0 ? void 0 :
            _b.queues.filter(queue => {
                return regex ? queue.name.match(regex) : true;
            }).map(queue => (react_1.default.createElement(Queue_1.Queue, { queue: queue, key: queue.name, selectedStatus: selectedStatus, selectStatus: setSelectedStatus, promoteJob: promoteJob(queue.name), retryJob: retryJob(queue.name), retryAll: retryAll(queue.name), cleanAllDelayed: cleanAllDelayed(queue.name), cleanAllFailed: cleanAllFailed(queue.name), cleanAllCompleted: cleanAllCompleted(queue.name), cleanAllWaiting: cleanAllWaiting(queue.name) }))))))));
};
//# sourceMappingURL=App.js.map