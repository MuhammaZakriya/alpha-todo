import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders frontend root element", () => {
  render(<App />);
  const heading = screen.getByText(/Todo App/i);
  expect(heading).toBeInTheDocument();
});