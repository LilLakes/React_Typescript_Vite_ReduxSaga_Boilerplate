import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { RootState } from "@/store/rootReducer";
import rootReducer from "@/store/rootReducer";
import rootSaga from "@/store/rootSaga";


/**
 * Renders a React component with a Redux store configured for testing.
 * 
 * @param component - The React component to be rendered.
 * @param initialStore - An optional partial initial state for the Redux store.
 * 
 * @returns An object containing:
 * - The result of the render function from @testing-library/react, allowing for testing interactions.
 * - The configured Redux store, enabling direct store manipulation or inspection.
 */

export const renderWithRedux = (
    component: React.ReactElement,
    initialStore: Partial<RootState>
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
