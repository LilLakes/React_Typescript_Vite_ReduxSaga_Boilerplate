import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { RootState } from "@/store/rootReducer";
import rootReducer from "@/store/rootReducer";
import rootSaga from "@/store/rootSaga";


/**
 * Renders a React component with a Redux store for testing purpose
 *
 * @param component The component to render
 * @param initialStore The initial state of the Redux store
 * @returns An object with the result of `render` and the store
 */
export const renderWithRedux = (
    component: React.ReactElement,
    initialStore: RootState
) => {
    const sagaMiddleware = createSagaMiddleware();

    const store = configureStore({
        reducer: rootReducer,
        preloadedState: initialStore,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    });

    sagaMiddleware.run(rootSaga);

    return {
        ...render(
            <Provider store={store}>
                {component}
            </Provider>
        ),
        store,
    };
};
