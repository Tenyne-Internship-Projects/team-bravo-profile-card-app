import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

test("calls onClick when clicked", async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click Me</Button>);

  await userEvent.click(screen.getByText(/click me/i));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
