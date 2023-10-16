import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../App";
import { Provider } from "react-redux";
import store from "../store/store";

test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(true).toBeTruthy();
});
