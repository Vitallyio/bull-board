/// <reference types="react" />
import { AppQueue } from '../../@types/app';
export declare const JobPagination: ({ queue, status, }: {
    queue: AppQueue;
    status: "latest" | "active" | "waiting" | "completed" | "failed" | "delayed" | "paused";
}) => JSX.Element;
