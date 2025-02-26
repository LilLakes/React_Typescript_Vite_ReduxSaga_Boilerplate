import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { greetingsList, useGreetings } from "./useGreetings";

describe("useGreetings", () => {

    
    it("Change the greeting", () => {
        const { result, rerender } = renderHook(() => useGreetings());

        act(() => result.current.changeGreeting()); // Call changeGreeting before checking the greeting value
        rerender();
        
        expect(result.current.greeting).toBe(`${greetingsList[1]}, Developer`);
    })

    it("Should cycle through all greetings", () => {
        const { result, rerender } = renderHook(() => useGreetings());
    
        // Cambiare saluto e verificare tutti i saluti
        for (let i = 0; i < greetingsList.length; i++) {
            expect(result.current.greeting).toBe(`${greetingsList[i]}, Developer`);    
            act(() => result.current.changeGreeting()); // Call changeGreeting before checking the greeting value
            rerender();     
        }
    
        // Verifica che torni al primo saluto   
        expect(result.current.greeting).toBe(`${greetingsList[0]}, Developer`);
    });

    it("Should change the name", () => {
        const { result, rerender } = renderHook(() => useGreetings());

        act(() => result.current.setToGreet("LilLakes")); // Call setToGreet before checking the greeting value
        rerender();

        expect(result.current.greeting).toBe(`${greetingsList[0]}, LilLakes`);
    })
})