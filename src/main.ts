import { ActionPayload, GetterTree, Module, MutationTree, Store } from "vuex";
import { LoaderOptions, State, StoreRuntime } from "./types";

const getters: GetterTree<State, unknown> = {
  getWait: state => (actionName: string): boolean => state[actionName]
};

function createState (actions: string[]): State {
  return actions.reduce((obj: State, value: string) => {
    obj[value] = false;
    return obj;
  }, {});
}

function createMutations (actions: string[]): MutationTree<State> {
  return actions.reduce((obj: MutationTree<State>, value: string) => {
    obj[value] = (state: State, payload): void => {
      state[value] = payload;
    };

    return obj;
  }, {});
}

function createModule (actions: string[], options: LoaderOptions): Module<State, unknown> {
  return {
    namespaced: options.namespaced,
    state: createState(actions),
    getters,
    mutations: createMutations(actions)
  };
}

export default (store: Store<unknown>, options: LoaderOptions): void => {
  const { vuexModuleName } = options;
  const actions = Object.keys((store as Store<unknown> & StoreRuntime)._actions);

  store.registerModule(vuexModuleName, createModule(actions, options));

  store.subscribeAction({
    before (action: ActionPayload) {
      store.commit(`${ vuexModuleName }/${ action.type }`, true);
    },

    after (action: ActionPayload) {
      store.commit(`${ vuexModuleName }/${ action.type }`, false);
    },

    error (action: ActionPayload) {
      store.commit(`${ vuexModuleName }/${ action.type }`, false);
    }
  });
};
