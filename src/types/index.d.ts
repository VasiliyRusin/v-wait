import { Store } from "vuex";

export interface LoaderConstructorOptions {
    store: Store<unknown>;
}

export interface LoaderOptions {
    namespaced: boolean;
    accessorName: string;
    vuexModuleName: string;
}

export interface StoreRuntime {
    _actions: object;
}

export interface State {
    [index: string]: boolean;
}
