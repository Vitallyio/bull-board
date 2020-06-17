import { Queue } from 'bull';
import { Queue as QueueMq } from 'bullmq';
declare const router: import("express-serve-static-core").Express;
declare type Q = Queue | QueueMq;
export declare const setQueues: (bullQueues: readonly Q[]) => void;
export declare const replaceQueues: (bullQueues: readonly Q[]) => void;
export { router };
