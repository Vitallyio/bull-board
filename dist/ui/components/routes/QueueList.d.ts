/// <reference types="react" />
import { Store } from '../hooks/useStore';
export declare const escapeRegExp: (text: string) => string;
interface QueueListProps {
    store: Store;
}
export declare const QueueList: (props: QueueListProps) => JSX.Element;
export {};
