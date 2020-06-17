import { RequestHandler } from 'express';
declare type RequestParams = {
    queueName: string;
    queueStatus: 'completed' | 'wait' | 'active' | 'delayed' | 'failed';
};
export declare const cleanAll: RequestHandler<RequestParams>;
export {};
