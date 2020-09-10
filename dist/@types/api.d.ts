import { ValidMetrics, AppQueue } from './app';
import { Status } from '../ui/components/constants';
interface QueryNameStatus {
    [name: string]: Status;
}
interface QueryPage {
    page?: number;
}
export declare type GetQueuesQuery = QueryNameStatus & QueryPage;
export interface GetQueues {
    stats: Partial<ValidMetrics>;
    queueNames: Array<string>;
    queues: {
        [name: string]: AppQueue;
    };
}
export interface RouteParams {
    queue?: string;
    status?: Status;
    search?: string;
    page?: string;
}
export {};
