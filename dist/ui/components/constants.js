"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUSES = {
    latest: 'latest',
    active: 'active',
    waiting: 'waiting',
    completed: 'completed',
    failed: 'failed',
    delayed: 'delayed',
    paused: 'paused',
};
exports.FIELDS = {
    active: ['id', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
    completed: ['id', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
    delayed: ['id', 'attempts', 'data', 'delay', 'opts', 'promote', 'timestamps'],
    failed: [
        'id',
        'attempts',
        'failedReason',
        'data',
        'opts',
        'progress',
        'retry',
        'timestamps',
    ],
    latest: ['id', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
    paused: ['id', 'attempts', 'data', 'opts', 'timestamps'],
    waiting: ['id', 'data', 'opts', 'timestamps'],
};
//# sourceMappingURL=constants.js.map