import { Status } from '../constants';
interface StateSlice {
    search: string | undefined;
    status: Status | undefined;
    job: string | undefined;
}
export declare const useSearch: (state: StateSlice) => void;
export {};
