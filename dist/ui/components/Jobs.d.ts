/// <reference types="react" />
import { AppJob, AppQueue } from '../../@types/app';
export declare const Jobs: ({ retryJob, cleanJob, promoteJob, queue, status, }: {
    retryJob: (job: AppJob) => () => Promise<void>;
    cleanJob: (job: AppJob) => () => Promise<void>;
    promoteJob: (job: AppJob) => () => Promise<void>;
    queue: AppQueue;
    status: "active" | "failed" | "waiting" | "paused" | "completed" | "delayed" | "latest";
}) => JSX.Element;
