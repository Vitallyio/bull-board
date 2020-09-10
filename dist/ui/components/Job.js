"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const date_fns_1 = require("date-fns");
const react_highlight_1 = __importDefault(require("react-highlight"));
const constants_1 = require("./constants");
const PlusIcon_1 = require("./PlusIcon");
const PlayIcon_1 = require("./PlayIcon");
const CheckIcon_1 = require("./CheckIcon");
const Timestamp_1 = require("./Timestamp");
const fieldComponents = {
    id: ({ job }) => {
        const displayShortId = job.id && String(job.id).length > 10;
        const shortId = `${String(job.id).slice(0, 6)}...`;
        const [showId, toggleId] = react_1.useState(false);
        return (react_1.default.createElement(react_1.default.Fragment, null, displayShortId ? (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("button", { onClick: () => toggleId(!showId) }, "Toggle full id"),
            react_1.default.createElement("div", { style: { fontWeight: 'bold' } },
                "#",
                showId ? job.id : shortId))) : (react_1.default.createElement("b", null,
            "#",
            job.id))));
    },
    timestamps: ({ job }) => (react_1.default.createElement("div", { className: "timestamps" },
        react_1.default.createElement("div", null,
            react_1.default.createElement(PlusIcon_1.PlusIcon, null),
            " ",
            react_1.default.createElement(Timestamp_1.Timestamp, { ts: job.timestamp })),
        job.processedOn && (react_1.default.createElement("div", null,
            react_1.default.createElement(PlayIcon_1.PlayIcon, null),
            " ",
            react_1.default.createElement(Timestamp_1.Timestamp, { ts: job.processedOn, prev: job.timestamp }))),
        job.finishedOn && (react_1.default.createElement("div", null,
            react_1.default.createElement(CheckIcon_1.CheckIcon, null),
            " ",
            react_1.default.createElement(Timestamp_1.Timestamp, { ts: job.finishedOn, prev: job.processedOn }))))),
    name: ({ job }) => react_1.default.createElement(react_1.default.Fragment, null, job.name === '__default__' ? '--' : job.name),
    progress: ({ job }) => {
        switch (typeof job.progress) {
            case 'object':
                return (react_1.default.createElement(react_highlight_1.default, { className: "json" }, JSON.stringify(job.progress, null, 2)));
            case 'number':
                const integerProgress = job.progress * 100;
                const formattedProgress = integerProgress.toFixed(2);
                if (integerProgress > 100) {
                    return react_1.default.createElement("div", { className: "progress-wrapper" },
                        formattedProgress,
                        "%");
                }
                return (react_1.default.createElement("div", { className: "progress-wrapper" },
                    react_1.default.createElement("div", { className: "progress-bar", style: {
                            width: `${integerProgress}%`,
                        } },
                        formattedProgress,
                        "%\u00A0")));
            default:
                return react_1.default.createElement(react_1.default.Fragment, null, "--");
        }
    },
    attempts: ({ job }) => react_1.default.createElement(react_1.default.Fragment, null, job.attempts),
    delay: ({ job }) => (react_1.default.createElement(react_1.default.Fragment, null, date_fns_1.formatDistanceStrict(Number(job.timestamp || 0) + Number(job.delay || 0), Date.now()))),
    failedReason: ({ job }) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            job.failedReason || 'NA',
            react_1.default.createElement(react_highlight_1.default, { className: "javascript" }, job.stacktrace)));
    },
    data: ({ job }) => {
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(react_highlight_1.default, { className: "json" }, JSON.stringify(job.data, null, 2))));
    },
    opts: ({ job }) => (react_1.default.createElement(react_highlight_1.default, { className: "json" }, JSON.stringify(job.opts, null, 2))),
    retry: ({ retryJob }) => react_1.default.createElement("button", { onClick: retryJob }, "Retry"),
    clean: ({ cleanJob }) => react_1.default.createElement("button", { onClick: cleanJob }, "Clean"),
    promote: ({ delayedJob }) => react_1.default.createElement("button", { onClick: delayedJob }, "Promote"),
};
exports.Job = ({ job, status, queueName, retryJob, cleanJob, promoteJob, }) => {
    return (react_1.default.createElement("tr", null, constants_1.FIELDS[status].map(field => {
        const Field = fieldComponents[field];
        return (react_1.default.createElement("td", { key: `${queueName}-${job.id}-${field}` },
            react_1.default.createElement(Field, { job: job, retryJob: retryJob(job), cleanJob: cleanJob(job), delayedJob: promoteJob(job) })));
    })));
};
//# sourceMappingURL=Job.js.map