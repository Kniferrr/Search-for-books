import "./App.scss";
import BookList from "./components/BookList/BookList";
import Headder from "./components/Headder/Headder";
import { HashRouter, Route, Routes } from "react-router-dom";
import BookPage from "./components/BookPage/BookPage";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <HashRouter>
          <Headder />
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookPage />} />
          </Routes>
        </HashRouter>
      </Provider>
    </>
  );
}

export default App;
