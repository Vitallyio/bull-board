/// <reference types="react" />
import { AppQueue } from '../../@types/app';
export declare const JobPagination: ({ queue, status, }: {
    queue: AppQueue;
    status: "active" | "failed" | "waiting" | "paused" | "completed" | "delayed" | "latest";
}) => JSX.Element;
