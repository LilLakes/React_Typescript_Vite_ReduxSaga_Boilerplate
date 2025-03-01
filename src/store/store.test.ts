import { store } from './store'; // Assicurati di avere il percorso corretto
import rootReducer from './rootReducer'; // Importa il tuo rootReducer
import { increment } from './counter/counterSlice'; // Importa una tua azione
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { describe, expect, it } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';

describe('Redux Store', () => {
    it('should create the store with the correct initial state', () => {
        const state = store.getState();
        expect(state).toEqual(rootReducer(undefined, { type: '@@INIT' })); // Verifica lo stato iniziale
    });

    it('should dispatch actions and update state', () => {
        // Simula il dispatch di un'azione
        store.dispatch(increment());
        
        // Verifica se lo stato è stato aggiornato come previsto
        const state = store.getState();
        expect(state.counter.value).toBe(1);
    });

    it('should run the root saga', () => {
        const sagaMiddleware = createSagaMiddleware();
        configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
        });

        const task = sagaMiddleware.run(rootSaga);
        
        expect(task.isRunning()).toBe(true);

        // Annulla il task al termine del test
        task.cancel();
    });
});
