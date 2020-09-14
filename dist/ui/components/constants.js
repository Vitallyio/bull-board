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
    active: ['id', 'name', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
    completed: [
        'id',
        'name',
        'attempts',
        'data',
        'opts',
        'progress',
        'timestamps',
    ],
    delayed: [
        'id',
        'name',
        'attempts',
        'data',
        'delay',
        'opts',
        'promote',
        'timestamps',
        'clean',
    ],
    failed: [
        'id',
        'attempts',
        'failedReason',
        'data',
        'opts',
        'progress',
        'retry',
        'timestamps',
        'clean',
    ],
    latest: ['id', 'name', 'attempts', 'data', 'opts', 'progress', 'timestamps'],
    paused: ['id', 'name', 'attempts', 'data', 'opts', 'timestamps'],
    waiting: ['id', 'name', 'data', 'opts', 'timestamps', 'clean'],
};
//# sourceMappingURL=constants.js.map