import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { decrement, decrementAsync, increment, incrementAsync } from "@/store/counter/counterSlice";

const TestComponent: React.FC = () => {

    const { value } = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch()

    return ( 
        <>
            <h1>BoilerPlate by LilLakes</h1>

            <ul>
                <li>ReactJs</li>
                <li>Typescript</li>
                <li>Vite</li>
                <li>Redux - Redux Saga</li>
            </ul>

            <div className="flex gap">
                <button onClick={() => dispatch(decrementAsync())}>-1 Async</button>
                <button onClick={() => dispatch(decrement())}>-1</button>
                <p>{value}</p>
                <button onClick={() => dispatch(increment())}>+1</button>
                <button onClick={() => dispatch(incrementAsync())}>+1 Async</button>
            </div>

        </>
    );
};

export default TestComponent;