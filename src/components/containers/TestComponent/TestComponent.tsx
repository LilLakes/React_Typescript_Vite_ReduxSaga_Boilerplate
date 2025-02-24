import "./TestComponent.css"
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { decrement, decrementAsync, increment, incrementAsync } from "@/store/counter/counterSlice";
import { reactIcon, reduxIcon, typescriptIcon, viteIcon, vitestIcon } from "@/assets/icons";
import { TestComponentProps } from "./types/TestComponent.types";
import { CustomButton } from "@/components/common";

/**
 * This component is a test component for the boilerplate
 * It contains a few buttons and a counter that increments and decrements
 * It also displays the value of the counter
 * The state of the counter is managed by the Redux store
 * The buttons are connected to the Redux store using the useDispatch hook
 * The value of the counter is displayed using the useSelector hook
 */
const TestComponent: React.FC<TestComponentProps> = () => {

    const { value } = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch()

    return ( 
        <>
            <h1>BoilerPlate by LilLakes</h1>
            
            <ul className="no_point_ul">
                <li className="icon_label"><img src={reactIcon} alt="icon" className="icon"/>ReactJs</li>
                <li className="icon_label"><img src={typescriptIcon} alt="icon" className="icon"/>Typescript</li>
                <li className="icon_label"><img src={viteIcon} alt="icon" className="icon"/>Vite</li>
                <li className="icon_label"><img src={reduxIcon} alt="icon" className="icon"/>Redux - Redux Saga</li>
                <li className="icon_label"><img src={vitestIcon} alt="icon" className="icon"/>Vitest - React Testing Library</li>
            </ul>

            <div className="flex gap">
                <CustomButton onClick={() => dispatch(decrementAsync())}>-1 Async</CustomButton>
                <CustomButton onClick={() => dispatch(decrement())}>-1</CustomButton>
                <p>{value}</p>
                <CustomButton onClick={() => dispatch(increment())}>+1</CustomButton>
                <CustomButton onClick={() => dispatch(incrementAsync())}>+1 Async</CustomButton>
            </div>

        </>
    );
};

export default TestComponent;