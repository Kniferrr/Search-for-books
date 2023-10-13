import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import store from "../store/store";
import App from "../App";

let container: HTMLDivElement | null = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container!.remove();
});

it("renders the App component with Redux store", () => {
  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });
});
