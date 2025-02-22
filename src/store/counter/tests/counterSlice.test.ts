import { describe, expect, it } from "vitest";
import counterReducer, { CounterState, decrement, increment } from "../counterSlice";

describe("counterSlice", () => {
  it("Should increment the counter", () => {

    const initialState: CounterState = { value: 0 };
    const nextState = counterReducer(initialState, increment());

    expect(nextState.value).toBe(1);
  });

  
  it("Should decrement the counter", () => {

    const initialState: CounterState = { value: 2 };
    const nextState = counterReducer(initialState, decrement());

    expect(nextState.value).toBe(1);
  });
});