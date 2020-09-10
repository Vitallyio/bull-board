"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const constants_1 = require("./constants");
const Job_1 = require("./Job");
exports.Jobs = ({ retryJob, cleanJob, promoteJob, queue, status, }) => {
    const jobs = queue.jobs[status];
    if (!jobs.length) {
        return react_1.default.createElement(react_1.default.Fragment, null,
            "No jobs with status ",
            status);
    }
    return (react_1.default.createElement("table", null,
        react_1.default.createElement("thead", null,
            react_1.default.createElement("tr", null, constants_1.FIELDS[status].map(field => (react_1.default.createElement("th", { key: field }, field))))),
        react_1.default.createElement("tbody", null, jobs.map(job => (react_1.default.createElement(Job_1.Job, { key: job.id, job: job, status: status, queueName: name, retryJob: retryJob, cleanJob: cleanJob, promoteJob: promoteJob }))))));
};
//# sourceMappingURL=Jobs.js.map