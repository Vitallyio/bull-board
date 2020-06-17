export declare const STATUSES: {
    latest: string;
    active: string;
    waiting: string;
    completed: string;
    failed: string;
    delayed: string;
    paused: string;
};
export declare type Status = keyof typeof STATUSES;
export declare type Field = 'attempts' | 'data' | 'id' | 'opts' | 'progress' | 'timestamps' | 'delay' | 'failedReason' | 'retry' | 'promote';
export declare const FIELDS: Record<Status, Field[]>;
