import { put, takeEvery, delay } from 'redux-saga/effects';
import { decrement, decrementAsync, increment, incrementAsync } from './counterSlice';

export function* handleIncrementAsync() {
  yield delay(1000); // Simula un'operazione asincrona
  yield put(increment());
}

export function* handleDecrementAsync() {
    yield delay(1000); // Simula un'operazione asincrona
    yield put(decrement());
}

export default function* counterSaga() {
  yield takeEvery(incrementAsync, handleIncrementAsync);
  yield takeEvery(decrementAsync, handleDecrementAsync);
}