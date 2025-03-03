import { screen, fireEvent, waitFor } from '@testing-library/react';
import { RootState } from "@/store/rootReducer";
import TestComponent from "../TestComponent";
import { describe, expect, it } from 'vitest';
import { renderWithRedux } from '@/utils/testingUtils';

const renderTestComponentWithRedux = (initialStore: Partial<RootState>) => {
    renderWithRedux(<TestComponent/>, initialStore);
}

describe("TestComponent", () => {
    it("Render correctly", () => {
        const initialStore: RootState = { counter: { value: 0 } };
        renderTestComponentWithRedux(initialStore);

        expect(screen.getByText("BoilerPlate by LilLakes")).toBeTruthy();
        expect(screen.getByText("ReactJs")).toBeTruthy();
        expect(screen.getByText("Typescript")).toBeTruthy();
        expect(screen.getByText("Vite")).toBeTruthy();
        expect(screen.getByText("Redux - Redux Saga")).toBeTruthy();
        expect(screen.getByText("Vitest - React Testing Library")).toBeTruthy();

        expect(screen.getByText("Hello, Developer")).toBeTruthy();
        expect(screen.getByRole("button", { name: "Change greeting" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "Set name" })).toBeTruthy();
        expect(screen.getByRole("textbox")).toBeTruthy();

        expect(screen.getByRole("button", { name: "+1 Async" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "+1" })).toBeTruthy();
        expect(screen.getByText("0")).toBeTruthy();
        expect(screen.getByRole("button", { name: "-1" })).toBeTruthy();
        expect(screen.getByRole("button", { name: "-1 Async" })).toBeTruthy();
    })

    it("Should allow the user to enter a name and update the greeting", () => {
        renderTestComponentWithRedux({});
        
        const input = screen.getByPlaceholderText ("Insert name");
        fireEvent.change(input, { target: { value: "Alice" } });

        expect(input.getAttribute("value")).toBe("Alice");

        const setNameButton = screen.getByRole("button", { name: "Set name" });
        fireEvent.click(setNameButton);

        expect(screen.getByText("Hello, Alice")).toBeTruthy();
    });

    it("Display the correct counter value", () => {
        const initialStore: RootState = { counter: { value: 5 } };
        renderTestComponentWithRedux(initialStore);

        expect(screen.getByText("5")).toBeTruthy();
    })

    it("Should increment the counter", () => {
        const initialStore: RootState = { counter: { value: 5 } };
        renderTestComponentWithRedux(initialStore);

        const incrementButton = screen.getByRole("button", { name: "+1" });
        fireEvent.click(incrementButton);

        expect(screen.getByText("6")).toBeTruthy();
    })

    it("Should decrement the counter", () => {
        const initialStore = {counter : {value: 5}};
        renderTestComponentWithRedux(initialStore);

        const decreaseButton = screen.getByRole("button", { name: "-1" });
        fireEvent.click(decreaseButton);

        expect(screen.getByText("4")).toBeTruthy();
    })

    it("Should increase the counter after 1 sec", async () => {
        const initialStore = {counter : {value: 5}};
        renderTestComponentWithRedux(initialStore);
        
        const increaseButtonAsync = screen.getByRole("button", { name: "+1 Async" });
        fireEvent.click(increaseButtonAsync);

        await waitFor(() => {
            expect(screen.getByText("6")).toBeTruthy();
        }, { timeout: 2000 })
    })

    it("Should decrement the counter after 1 sec", async () => {
        const initialStore = {counter : {value: 5}};
        renderTestComponentWithRedux(initialStore);
        
        const decreaseButtonAsync = screen.getByRole("button", { name: "-1 Async" });
        fireEvent.click(decreaseButtonAsync);

        await waitFor(() => {
            expect(screen.getByText("4")).toBeTruthy();
        }, { timeout: 2000 })
    })
})