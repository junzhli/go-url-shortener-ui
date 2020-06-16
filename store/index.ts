import { createStore, Store } from "redux";
import rootReducer from "../reducers";

export type AppState = ReturnType<typeof rootReducer>;
let store: Store<AppState>;

const configureStore = (preloadedState?) => {
    const _store = createStore(
        rootReducer,
        preloadedState
    );

    return _store;
};

export const initializeStore = (preloadedState?) => {
    let _store = store ?? configureStore(preloadedState);

    // After navigating to a page with an initial Redux state, merge that state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = configureStore({
            ...store.getState(),
            ...preloadedState,
        });
        // Reset the current store
        store = undefined;
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store;
    // Create the store once in the client
    if (!store) store = _store;

    return _store;
};

export const useStore = (initialState) => {
    const _store = initializeStore(initialState);
    return _store;
};
