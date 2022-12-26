import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

test("renders content", () => {
  const todo = {
    text: "Testing todo-component",
    done: false,
  };

  const mockHandlerDelete = jest.fn();
  const mockHandlerComplete = jest.fn();

  render(
    <Todo
      onClickDelete={mockHandlerDelete}
      onClickComplete={mockHandlerComplete}
      todo={todo}
    />
  );

  const element = screen.getByText("Testing todo-component");
  expect(element).toBeDefined();
});
