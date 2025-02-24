import "./TestComponent.css"
import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootReducer";
import { decrement, decrementAsync, increment, incrementAsync } from "@/store/counter/counterSlice";
import { reactIcon, reduxIcon, typescriptIcon, viteIcon, vitestIcon } from "@/assets/icons";
import { TestComponentProps } from "./types/TestComponent.types";
import { CustomButton } from "@/components/common";
import { useGreetings } from "@/hooks/useGreetings";

/**
 * TestComponent is a React functional component that demonstrates the usage of various technologies
 * such as React, TypeScript, Vite, Redux, Redux Saga, and Vitest. It displays a list of technology
 * icons with labels, a greeting message that can be changed using a custom hook, and a counter 
 * that can be incremented or decremented using Redux actions, both synchronously and asynchronously.
 * 
 * The component uses the following hooks:
 * - `useSelector` to access the counter value from the Redux store.
 * - `useDispatch` to dispatch actions to the Redux store.
 * - `useGreetings` custom hook to manage greeting messages.
 * - `useState` to manage the local state for user input.
 * 
 * The UI includes:
 * - A heading displaying the component name.
 * - A list of technology icons and names.
 * - A greeting section with buttons to change the greeting and set a name.
 * - A counter section with buttons to increment and decrement the count, with both synchronous and
 *   asynchronous options.
 */

const TestComponent: React.FC<TestComponentProps> = () => {

    const { value } = useSelector((state: RootState) => state.counter);
    const dispatch = useDispatch()
    const { greeting, changeGreeting, setToGreet } = useGreetings();
    const [name, setName] = useState<string>("");

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

            <h2>{greeting}</h2>            
            <div className="flex gap">
                <CustomButton onClick={changeGreeting}>Change greeting</CustomButton>
                <CustomButton onClick={() => setToGreet(name)}>Set name</CustomButton>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                <p>(example of custom hook)</p>
            </div>

            <h2>Counter</h2>
            <div className="flex gap">
                <CustomButton onClick={() => dispatch(decrementAsync())}>-1 Async</CustomButton>
                <CustomButton onClick={() => dispatch(decrement())}>-1</CustomButton>
                <p>{value}</p>
                <CustomButton onClick={() => dispatch(increment())}>+1</CustomButton>
                <CustomButton onClick={() => dispatch(incrementAsync())}>+1 Async</CustomButton>
                <p>(example of redux and redux saga)</p>
            </div>

        </>
    );
};

export default TestComponent;