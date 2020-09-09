import * as api from '../../@types/api';
import { Reducer } from 'redux';
interface State {
    data: null | api.GetQueues;
    loading: boolean;
    search: string | undefined;
}
declare enum ActionType {
    one = "one"
}
interface Action {
    type: ActionType;
}
export declare const reducer: Reducer<State, Action>;
export {};
