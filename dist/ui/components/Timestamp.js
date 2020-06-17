"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const date_fns_1 = require("date-fns");
const today = new Date();
const formatDate = (ts) => {
    if (date_fns_1.isToday(ts)) {
        return date_fns_1.format(ts, 'HH:mm:ss');
    }
    return date_fns_1.getYear(ts) === date_fns_1.getYear(today)
        ? date_fns_1.format(ts, 'MM/dd HH:mm:ss')
        : date_fns_1.format(ts, 'MM/dd/yyyy HH:mm:ss');
};
exports.Timestamp = ({ ts, prev, }) => {
    if (ts === null) {
        return null;
    }
    const date = formatDate(ts);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        date,
        ' ',
        prev && (react_1.default.createElement("small", null,
            "(",
            date_fns_1.formatDistance(ts, prev, { includeSeconds: true }),
            ")"))));
};
//# sourceMappingURL=Timestamp.js.map