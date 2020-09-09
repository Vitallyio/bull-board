/// <reference types="react" />
import { Store } from './hooks/useStore';
interface PassedProps {
    store: Store;
}
interface ConnectProps {
}
interface DispatchProps {
    doThing: () => void;
}
declare type Props = PassedProps & ConnectProps & DispatchProps;
export declare const Header: import("react-redux").ConnectedComponent<({ store, doThing }: Props) => JSX.Element, Pick<Props, "store"> & PassedProps>;
export {};
