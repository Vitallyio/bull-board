/// <reference types="react" />
import { Status } from '../constants';
import * as api from '../../../@types/api';
import { AppQueue, AppJob } from '../../../@types/app';
declare type State = {
    data: null | api.GetQueues;
    loading: boolean;
};
export declare type SelectedStatus = [AppQueue['name'], Status];
export interface Store {
    state: State;
    promoteJob: (queueName: string) => (job: AppJob) => () => Promise<void>;
    retryJob: (queueName: string) => (job: AppJob) => () => Promise<void>;
    retryAll: (queueName: string) => () => Promise<void>;
    cleanAllDelayed: (queueName: string) => () => Promise<void>;
    cleanAllFailed: (queueName: string) => () => Promise<void>;
    cleanAllCompleted: (queueName: string) => () => Promise<void>;
    selectedStatus: SelectedStatus | undefined;
    setSelectedStatus: React.Dispatch<React.SetStateAction<SelectedStatus | undefined>>;
}
export declare const useStore: (basePath: string) => Store;
export {};
