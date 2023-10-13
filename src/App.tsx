import "./App.scss";
import BookList from "./components/BookList";
import TextSearchInput from "./components/Headder";
import { HashRouter, Route, Routes } from "react-router-dom";
import BookPage from "./components/BookPage";

function App() {
  return (
    <>
      <HashRouter basename="/">
        <TextSearchInput />
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookPage />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
