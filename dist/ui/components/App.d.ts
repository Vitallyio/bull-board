/// <reference types="react" />
import * as api from '../../@types/api';
export declare type State = {
    data: null | api.GetQueues;
    loading: boolean;
    search: string | undefined;
};
export declare const App: ({ basePath }: {
    basePath: string;
}) => JSX.Element;
export declare const AppInner: ({ basePath }: {
    basePath: string;
}) => JSX.Element;
