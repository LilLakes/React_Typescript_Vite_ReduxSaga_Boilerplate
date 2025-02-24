import { screen, render, fireEvent } from "@testing-library/react";
import CustomButton from "../CustomButton";
import { describe, expect, it, vi } from "vitest";

describe("CustomButton", () => {
    it("Should render the CustomButton component", () => {
        render(<CustomButton onClick={() => {}}>Click me</CustomButton>);

        expect(screen.getByText("Click me")).toBeTruthy();
    })

    it("Should call the onClick function when the button is clicked", () => {
        const mockOnClick = vi.fn();

        render(<CustomButton onClick={mockOnClick}>Click me</CustomButton>);

        const button = screen.getByRole("button", { name: "Click me"});
        fireEvent.click(button);

        expect(mockOnClick).toHaveBeenCalledTimes(1);

    })
})