/// <reference types="react" />
import { AppJob } from '../../@types/app';
export declare const Job: ({ job, status, queueName, retryJob, promoteJob, }: {
    job: AppJob;
    status: "latest" | "active" | "waiting" | "completed" | "failed" | "delayed" | "paused";
    queueName: string;
    retryJob: (job: AppJob) => () => Promise<void>;
    promoteJob: (job: AppJob) => () => Promise<void>;
}) => JSX.Element;
