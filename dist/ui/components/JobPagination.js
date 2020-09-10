"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
exports.JobPagination = ({ queue, status, }) => {
    const count = queue.counts[status];
    const params = react_router_dom_1.useParams();
    let pageNumbers = [];
    const totalPages = Math.ceil(count / 10);
    if (totalPages >= 2 && totalPages <= 10) {
        pageNumbers = new Array(totalPages).fill(null).map((_, i) => i);
    }
    else if (totalPages > 10) {
        if (params.page) {
            pageNumbers = [
                0,
                1,
                undefined,
                parseInt(params.page, 10),
                undefined,
                totalPages - 2,
                totalPages - 1,
            ];
        }
        else {
            pageNumbers = [
                0,
                1,
                undefined,
                Math.floor(totalPages / 2),
                totalPages - 2,
                totalPages - 1,
            ];
        }
    }
    return (react_1.default.createElement("div", { className: "job-pagination" }, pageNumbers.map(pageNum => {
        const pageString = pageNum !== 0 ? `/${pageNum}` : '';
        return (react_1.default.createElement(react_router_dom_1.NavLink, { exact: true, key: `${pageNum}`, className: `menu-item ${status} ${count === 0 ? 'off' : 'on'}`, activeClassName: `selected`, to: {
                pathname: `/${encodeURIComponent(queue.name)}/${status}${pageString}`,
            } },
            react_1.default.createElement("b", { className: "page" }, pageNum != null ? pageNum + 1 : '...')));
    })));
};
//# sourceMappingURL=JobPagination.js.map