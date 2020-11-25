import _Vue from "vue";
import { LoaderOptions, LoaderConstructorOptions } from "./types";
import plugin from "./main";

export default {
    install (Vue: typeof _Vue, { store, ...options }: LoaderConstructorOptions & LoaderOptions): void {
        const defaultOptions: LoaderOptions = {
            namespaced: true,
            accessorName: "wait",
            vuexModuleName: "wait"
        };
        const { accessorName, vuexModuleName } = defaultOptions;
    
        plugin(store, { ...defaultOptions, ...options });
        
        Vue.prototype[`$${ accessorName }`] = store.getters[`${ vuexModuleName }/getWait`];
    }
};
