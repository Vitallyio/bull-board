/// <reference types="react" />
import { AppJob } from '../../@types/app';
export declare const Job: ({ job, status, queueName, retryJob, promoteJob, }: {
    job: AppJob;
    status: "active" | "failed" | "waiting" | "paused" | "completed" | "delayed" | "latest";
    queueName: string;
    retryJob: (job: AppJob) => () => Promise<void>;
    promoteJob: (job: AppJob) => () => Promise<void>;
}) => JSX.Element;
