import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Button from "@/components/Button/Button";

describe("Button component", () => {
  it("renders the button with provided text", () => {
    render(<Button>Click Me</Button>);
    const btn = screen.getByText("Click Me");
    expect(btn).toBeInTheDocument();
  });

  it("fires onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Press</Button>);

    const btn = screen.getByText("Press");
    fireEvent.click(btn);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
