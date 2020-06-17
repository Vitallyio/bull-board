/// <reference types="react" />
import { AppJob, AppQueue } from '../../@types/app';
export declare const Jobs: ({ retryJob, promoteJob, queue: { jobs, name }, status, }: {
    retryJob: (job: AppJob) => () => Promise<void>;
    promoteJob: (job: AppJob) => () => Promise<void>;
    queue: AppQueue;
    status: "active" | "failed" | "waiting" | "paused" | "completed" | "delayed" | "latest";
}) => JSX.Element;
