/// <reference types="react" />
import { AppQueue, AppJob } from '../../@types/app';
import { SelectedStatus } from '../components/hooks/useStore';
interface QueueProps {
    queue: AppQueue;
    selectedStatus: SelectedStatus | undefined;
    selectStatus: (status: SelectedStatus | undefined) => void;
    cleanAllDelayed: () => Promise<void>;
    cleanAllFailed: () => Promise<void>;
    cleanAllCompleted: () => Promise<void>;
    retryAll: () => Promise<void>;
    retryJob: (job: AppJob) => () => Promise<void>;
    promoteJob: (job: AppJob) => () => Promise<void>;
}
export declare const Queue: ({ cleanAllDelayed, cleanAllFailed, cleanAllCompleted, queue, retryAll, retryJob, promoteJob, selectedStatus, selectStatus, }: QueueProps) => JSX.Element;
export {};
