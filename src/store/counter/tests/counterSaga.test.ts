import { describe, expect, it } from "vitest";
import { handleDecrementAsync, handleIncrementAsync } from "../counterSaga";
import { delay, put } from "redux-saga/effects";
import { decrement, increment } from "../counterSlice";

describe("counterSaga", () => {
  it("Should increment the counter async", () => {
    const saga = handleIncrementAsync();

    expect(saga.next().value).toEqual(delay(1000));

    expect(saga.next().value).toEqual(put(increment()));

    expect(saga.next().done).toBe(true);
  })
  
  it("Should decrement the counter async", () => {
    const saga = handleDecrementAsync();

    expect(saga.next().value).toEqual(delay(1000));

    expect(saga.next().value).toEqual(put(decrement()));

    expect(saga.next().done).toBe(true);
  })
});