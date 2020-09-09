import { ValidMetrics, AppQueue } from './app';
export interface GetQueues {
    stats: Partial<ValidMetrics>;
    queueNames: Array<string>;
    queues: {
        [name: string]: AppQueue;
    };
}
