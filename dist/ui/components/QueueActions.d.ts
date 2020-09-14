/// <reference types="react" />
import { Status } from './constants';
import { AppQueue } from '../../@types/app';
interface QueueActionProps {
    status: Status;
    queue: AppQueue;
    cleanAllDelayed: () => Promise<void>;
    cleanAllFailed: () => Promise<void>;
    cleanAllCompleted: () => Promise<void>;
    cleanAllWaiting: () => Promise<void>;
    retryAll: () => Promise<void>;
}
export declare const QueueActions: ({ status, retryAll, cleanAllFailed, cleanAllDelayed, cleanAllCompleted, cleanAllWaiting, }: QueueActionProps) => JSX.Element;
export {};
